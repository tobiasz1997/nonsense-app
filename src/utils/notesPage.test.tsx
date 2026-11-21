import type { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@pages/notes';
import { getServerSession } from 'next-auth/next';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';

vi.mock('next-auth/next', () => ({ getServerSession: vi.fn() }));

describe('notes page protection', () => {
	beforeEach(() => {
		vi.stubEnv('NEXTAUTH_URL', 'http://localhost:3000');
		vi.stubEnv('NEXTAUTH_SECRET', 'test-session-secret');
		vi.stubEnv('AZURE_AD_CLIENT_SECRET', 'test-client-secret');
		vi.stubEnv('AZURE_AD_CLIENT_ID', '33333333-3333-3333-3333-333333333333');
		vi.stubEnv('AZURE_AD_TENANT_ID', '11111111-1111-1111-1111-111111111111');
		vi.stubEnv(
			'AZURE_AD_ALLOWED_USER_ID',
			'22222222-2222-2222-2222-222222222222'
		);
	});

	afterEach(() => vi.unstubAllEnvs());

	it('redirects an unauthenticated request without returning page props', async () => {
		vi.mocked(getServerSession).mockResolvedValue(null);
		const context = createContext();
		expect(await getServerSideProps(context)).toEqual({
			redirect: { destination: '/login?callbackUrl=%2Fnotes', permanent: false }
		});
		expect(context.res.getHeader('Cache-Control')).toBe('private, no-store');
	});

	it('renders only after the server authorizes the session', async () => {
		vi.mocked(getServerSession).mockResolvedValue({
			user: {
				id: '22222222-2222-2222-2222-222222222222',
				tenantId: '11111111-1111-1111-1111-111111111111'
			},
			expires: '2099-01-01'
		});
		expect(await getServerSideProps(createContext())).toEqual({ props: {} });
	});
});

function createContext(): GetServerSidePropsContext {
	const req = Object.assign(new IncomingMessage(new Socket()), { cookies: {} });
	return {
		req,
		res: new ServerResponse(req),
		query: {},
		resolvedUrl: '/notes'
	};
}
