import type { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@pages/login';
import { getAuthorizedSession, isAuthConfigured } from '@utils/auth';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';

vi.mock('@utils/auth', async (importOriginal) => ({
	...(await importOriginal<typeof import('@utils/auth')>()),
	getAuthorizedSession: vi.fn(),
	isAuthConfigured: vi.fn()
}));

describe('sign-in page', () => {
	beforeEach(() => {
		vi.stubEnv('NEXTAUTH_URL', 'http://localhost:3000');
		vi.mocked(getAuthorizedSession).mockResolvedValue(null);
		vi.mocked(isAuthConfigured).mockReturnValue(true);
	});

	afterEach(() => vi.unstubAllEnvs());

	it('redirects an authorized user to notes', async () => {
		vi.mocked(getAuthorizedSession).mockResolvedValue({
			user: { id: 'owner', tenantId: 'tenant' },
			expires: '2099-01-01'
		});
		expect(await getServerSideProps(createContext())).toEqual({
			redirect: { destination: '/notes', permanent: false }
		});
	});

	it('reports missing configuration without exposing server secrets', async () => {
		vi.mocked(isAuthConfigured).mockReturnValue(false);
		expect(await getServerSideProps(createContext())).toEqual({
			props: { configured: false, error: null, callbackUrl: '/notes' }
		});
	});

	it('maps access denial to a safe error and disables caching', async () => {
		const context = createContext();
		context.query.error = 'AccessDenied';
		expect(await getServerSideProps(context)).toEqual({
			props: { configured: true, error: 'denied', callbackUrl: '/notes' }
		});
		expect(context.res.getHeader('Cache-Control')).toBe('private, no-store');
	});

	it('does not echo an arbitrary error or redirect from the URL', async () => {
		const context = createContext();
		context.query = {
			error: 'untrusted content',
			callbackUrl: 'https://example.com'
		};
		expect(await getServerSideProps(context)).toEqual({
			props: { configured: true, error: 'failed', callbackUrl: '/notes' }
		});
	});

	it('returns the requested page as the sign-in callback', async () => {
		const context = createContext();
		context.query.callbackUrl = '/private-projects?page=2';
		expect(await getServerSideProps(context)).toEqual({
			props: {
				configured: true,
				error: null,
				callbackUrl: '/private-projects?page=2'
			}
		});
	});

	it('redirects an authorized user to the requested page', async () => {
		vi.mocked(getAuthorizedSession).mockResolvedValue({
			user: { id: 'owner', tenantId: 'tenant' },
			expires: '2099-01-01'
		});
		const context = createContext();
		context.query.callbackUrl = '/private-projects?page=2';
		expect(await getServerSideProps(context)).toEqual({
			redirect: { destination: '/private-projects?page=2', permanent: false }
		});
	});

	it('never redirects an authorized user to an external origin', async () => {
		vi.mocked(getAuthorizedSession).mockResolvedValue({
			user: { id: 'owner', tenantId: 'tenant' },
			expires: '2099-01-01'
		});
		const context = createContext();
		context.query.callbackUrl = 'https://example.com';
		expect(await getServerSideProps(context)).toEqual({
			redirect: { destination: '/notes', permanent: false }
		});
	});
});

function createContext(): GetServerSidePropsContext {
	const req = Object.assign(new IncomingMessage(new Socket()), { cookies: {} });
	return {
		req,
		res: new ServerResponse(req),
		query: {},
		resolvedUrl: '/login'
	};
}
