import type { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import {
	canAccessApp,
	getAuthOptions,
	getAuthorizedSession,
	isAuthConfigured,
	getSafeCallbackUrl,
	requireAuth,
	withAuth
} from './auth';

vi.mock('next-auth/next', () => ({ getServerSession: vi.fn() }));

const tenantId = '11111111-1111-1111-1111-111111111111';
const userId = '22222222-2222-2222-2222-222222222222';

beforeEach(() => {
	vi.stubEnv('NEXTAUTH_URL', 'http://localhost:3000');
	vi.stubEnv('NEXTAUTH_SECRET', 'test-session-secret');
	vi.stubEnv('AZURE_AD_CLIENT_SECRET', 'test-client-secret');
	vi.stubEnv('AZURE_AD_CLIENT_ID', '33333333-3333-3333-3333-333333333333');
	vi.stubEnv('AZURE_AD_TENANT_ID', tenantId);
	vi.stubEnv('AZURE_AD_ALLOWED_USER_ID', userId);
});

afterEach(() => vi.unstubAllEnvs());

describe('application access policy', () => {
	it('allows only the configured object ID in the configured tenant', () => {
		expect(canAccessApp({ oid: userId, tid: tenantId })).toBe(true);
		expect(canAccessApp({ oid: tenantId, tid: tenantId })).toBe(false);
		expect(canAccessApp({ oid: userId, tid: userId })).toBe(false);
	});

	it.each([
		null,
		undefined,
		{},
		'owner@example.com',
		{ oid: userId },
		{ oid: 42, tid: tenantId }
	])('rejects missing or malformed identity %j', (identity) =>
		expect(canAccessApp(identity)).toBe(false)
	);

	it.each([
		'NEXTAUTH_SECRET',
		'AZURE_AD_CLIENT_SECRET',
		'AZURE_AD_ALLOWED_USER_ID',
		'AZURE_AD_TENANT_ID',
		'AZURE_AD_CLIENT_ID',
		'NEXTAUTH_URL'
	])('fails closed without %s', (key) => {
		vi.stubEnv(key, '');
		expect(isAuthConfigured()).toBe(false);
		expect(canAccessApp({ oid: userId, tid: tenantId })).toBe(false);
		expect(() => getAuthOptions()).toThrow('not configured');
	});

	it('rejects a common issuer instead of a specific tenant', () => {
		vi.stubEnv('AZURE_AD_TENANT_ID', 'common');
		expect(isAuthConfigured()).toBe(false);
	});

	it('denies sign-in for another account', async () => {
		const signIn = getAuthOptions().callbacks?.signIn;
		if (!signIn) {
			throw new Error('Missing signIn callback');
		}
		const account = {
			provider: 'azure-ad',
			type: 'oauth' as const,
			providerAccountId: userId
		};
		const profile = { sub: userId, oid: userId, tid: tenantId };
		const otherProfile = { sub: tenantId, oid: tenantId, tid: tenantId };
		expect(await signIn({ user: { id: userId }, account, profile })).toBe(true);
		expect(
			await signIn({ user: { id: tenantId }, account, profile: otherProfile })
		).toBe(false);
		expect(
			await signIn({
				user: { id: userId },
				account: { ...account, provider: 'other' },
				profile
			})
		).toBe(false);
	});
});

describe('protected pages', () => {
	it('preserves the requested page and query string when redirecting to login', async () => {
		vi.mocked(getServerSession).mockResolvedValue(null);
		const context = createContext('/private-projects?page=2');
		expect(await requireAuth(context)).toEqual({
			redirect: {
				destination: '/login?callbackUrl=%2Fprivate-projects%3Fpage%3D2',
				permanent: false
			}
		});
		expect(context.res.getHeader('Cache-Control')).toBe('private, no-store');
	});

	it('does not load private data before authorization', async () => {
		vi.mocked(getServerSession).mockResolvedValue(null);
		const loadData = vi.fn(async () => ({ props: { secret: 'private' } }));
		await withAuth(loadData)(createContext('/private-projects'));
		expect(loadData).not.toHaveBeenCalled();
	});

	it('passes the authorized session and context to the data loader', async () => {
		const session = { user: { id: userId, tenantId }, expires: '2099-01-01' };
		vi.mocked(getServerSession).mockResolvedValue(session);
		const context = createContext('/private-projects');
		const loadData = vi.fn(async () => {
			context.res.setHeader('Cache-Control', 'public, max-age=600');
			return { props: { project: 'private project' } };
		});
		expect(await withAuth(loadData)(context)).toEqual({
			props: { project: 'private project' }
		});
		expect(loadData).toHaveBeenCalledWith(context, session);
		expect(context.res.getHeader('Cache-Control')).toBe('private, no-store');
	});

	it('returns empty props for an authorized page without a loader', async () => {
		vi.mocked(getServerSession).mockResolvedValue({
			user: { id: userId, tenantId },
			expires: '2099-01-01'
		});
		expect(await requireAuth(createContext('/private-projects'))).toEqual({
			props: {}
		});
	});

	it('preserves a loader redirect or notFound response', async () => {
		vi.mocked(getServerSession).mockResolvedValue({
			user: { id: userId, tenantId },
			expires: '2099-01-01'
		});
		const redirect = { redirect: { destination: '/other', permanent: false } };
		expect(
			await withAuth(async () => redirect)(createContext('/private-projects'))
		).toEqual(redirect);
		expect(
			await withAuth(async () => ({ notFound: true }))(
				createContext('/private-projects')
			)
		).toEqual({ notFound: true });
	});
});

describe('safe return addresses', () => {
	it.each([
		undefined,
		null,
		[],
		['/private-projects'],
		'',
		'private-projects',
		'https://example.com/private',
		'//example.com/private',
		'/\\example.com',
		'javascript:alert(1)',
		'/%2f%2fexample.com',
		'/%5cexample.com',
		'/private\nLocation:evil',
		'/%0d%0aevil',
		'/login',
		'/login?callbackUrl=/login',
		'/api/auth/signin',
		'/api/auth',
		'/broken%'
	])('rejects an external, malformed, or looping address %j', (value) => {
		expect(getSafeCallbackUrl(value)).toBe('/notes');
	});

	it('accepts internal paths including search and hash', () => {
		expect(getSafeCallbackUrl('/private-projects?page=2#details')).toBe(
			'/private-projects?page=2#details'
		);
	});

	it('accepts absolute callback URLs only on the configured application origin', () => {
		expect(getSafeCallbackUrl('http://localhost:3000/private-projects')).toBe(
			'/private-projects'
		);
		expect(getSafeCallbackUrl('http://localhost:3001/private-projects')).toBe(
			'/notes'
		);
	});
});

function createContext(resolvedUrl: string): GetServerSidePropsContext {
	const req = Object.assign(new IncomingMessage(new Socket()), { cookies: {} });
	return { req, res: new ServerResponse(req), query: {}, resolvedUrl };
}

describe('server session authorization', () => {
	it('does not invoke authentication when configuration is absent', async () => {
		vi.stubEnv('AZURE_AD_ALLOWED_USER_ID', '');
		const req = Object.assign(new IncomingMessage(new Socket()), {
			cookies: {}
		});
		expect(await getAuthorizedSession(req, new ServerResponse(req))).toBeNull();
		expect(getServerSession).not.toHaveBeenCalled();
	});

	it('rejects a previously issued session when the allowed account changes', async () => {
		const req = Object.assign(new IncomingMessage(new Socket()), {
			cookies: {}
		});
		const session = { user: { id: userId, tenantId }, expires: '2099-01-01' };
		vi.mocked(getServerSession).mockResolvedValue(session);
		expect(await getAuthorizedSession(req, new ServerResponse(req))).toEqual(
			session
		);
		vi.stubEnv('AZURE_AD_ALLOWED_USER_ID', tenantId);
		expect(await getAuthorizedSession(req, new ServerResponse(req))).toBeNull();
	});

	it('rejects an unauthenticated request', async () => {
		const req = Object.assign(new IncomingMessage(new Socket()), {
			cookies: {}
		});
		vi.mocked(getServerSession).mockResolvedValue(null);
		expect(await getAuthorizedSession(req, new ServerResponse(req))).toBeNull();
	});
});
