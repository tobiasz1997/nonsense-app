import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { DefaultSession, NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import AzureADProvider from 'next-auth/providers/azure-ad';

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {
			id: string;
			tenantId: string;
		};
	}
}

const GUID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isAuthConfigured(): boolean {
	return Boolean(
		process.env.NEXTAUTH_URL &&
		process.env.NEXTAUTH_SECRET &&
		process.env.AZURE_AD_CLIENT_SECRET &&
		GUID_PATTERN.test(process.env.AZURE_AD_CLIENT_ID ?? '') &&
		GUID_PATTERN.test(process.env.AZURE_AD_TENANT_ID ?? '') &&
		GUID_PATTERN.test(process.env.AZURE_AD_ALLOWED_USER_ID ?? '')
	);
}

export function canAccessApp(identity: unknown): boolean {
	if (!isAuthConfigured() || typeof identity !== 'object' || !identity) {
		return false;
	}

	return (
		'oid' in identity &&
		'tid' in identity &&
		typeof identity.oid === 'string' &&
		typeof identity.tid === 'string' &&
		identity.oid.toLowerCase() ===
			process.env.AZURE_AD_ALLOWED_USER_ID?.toLowerCase() &&
		identity.tid.toLowerCase() === process.env.AZURE_AD_TENANT_ID?.toLowerCase()
	);
}

export function getAuthOptions(): NextAuthOptions {
	if (!isAuthConfigured()) {
		throw new Error('Microsoft Entra ID authentication is not configured.');
	}

	return {
		secret: process.env.NEXTAUTH_SECRET,
		session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
		pages: { signIn: '/login', error: '/login' },
		providers: [
			AzureADProvider({
				clientId: process.env.AZURE_AD_CLIENT_ID ?? '',
				clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? '',
				tenantId: process.env.AZURE_AD_TENANT_ID,
				checks: ['pkce', 'state'],
				profile(profile) {
					return {
						id: profile.sub,
						name: profile.name,
						email: profile.email,
						image: null
					};
				}
			})
		],
		callbacks: {
			signIn({ account, profile }) {
				return account?.provider === 'azure-ad' && canAccessApp(profile);
			},
			jwt({ token, account, profile }) {
				if (account) {
					token.oid = undefined;
					token.tid = undefined;
					if (
						canAccessApp(profile) &&
						profile &&
						'oid' in profile &&
						'tid' in profile
					) {
						token.oid = profile.oid;
						token.tid = profile.tid;
					}
				}
				return token;
			},
			session({ session, token }) {
				session.user = {
					...session.user,
					id: typeof token.oid === 'string' ? token.oid : '',
					tenantId: typeof token.tid === 'string' ? token.tid : ''
				};
				return session;
			}
		}
	};
}

export async function getAuthorizedSession(
	req: GetServerSidePropsContext['req'],
	res: GetServerSidePropsContext['res']
) {
	if (!isAuthConfigured()) {
		return null;
	}

	const session = await getServerSession(req, res, getAuthOptions());
	return session &&
		canAccessApp({ oid: session.user.id, tid: session.user.tenantId })
		? session
		: null;
}

export function getSafeCallbackUrl(value: unknown): string {
	const fallback = '/notes';
	if (
		typeof value !== 'string' ||
		!value ||
		value.startsWith('//') ||
		hasUnsafeUrlCharacters(value) ||
		(!value.startsWith('/') && !/^https?:\/\//.test(value))
	) {
		return fallback;
	}

	try {
		const baseUrl = new URL(
			process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
		);
		const url = new URL(value, baseUrl);
		const pathname = decodeURIComponent(url.pathname);
		if (
			url.origin !== baseUrl.origin ||
			pathname.startsWith('//') ||
			hasUnsafeUrlCharacters(pathname) ||
			/^\/(login|api\/auth)(\/|$)/i.test(pathname)
		) {
			return fallback;
		}
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return fallback;
	}
}

export function withAuth<Props extends Record<string, unknown>>(
	getPageProps: (
		context: GetServerSidePropsContext,
		session: Session
	) => ReturnType<GetServerSideProps<Props>>
): GetServerSideProps<Props> {
	return async (context) => {
		context.res.setHeader('Cache-Control', 'private, no-store');
		const session = await getAuthorizedSession(context.req, context.res);
		if (!session) {
			const callbackUrl = getSafeCallbackUrl(context.resolvedUrl);
			return {
				redirect: {
					destination: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
					permanent: false
				}
			};
		}
		const result = await getPageProps(context, session);
		context.res.setHeader('Cache-Control', 'private, no-store');
		return result;
	};
}

export const requireAuth = withAuth(async () => ({ props: {} }));

function hasUnsafeUrlCharacters(value: string): boolean {
	return Array.from(value).some((character) => {
		const code = character.charCodeAt(0);
		return code <= 32 || code === 127 || character === '\\';
	});
}
