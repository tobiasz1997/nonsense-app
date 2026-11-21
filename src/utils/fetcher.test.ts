import { fetcher } from './fetcher';

beforeEach(() => vi.stubGlobal('fetch', vi.fn()));
afterEach(() => vi.unstubAllGlobals());

describe('fetcher', () => {
	it('returns JSON from a successful response', async () => {
		vi.mocked(fetch).mockResolvedValue(
			new Response(JSON.stringify({ value: 42 }))
		);
		expect(await fetcher<{ value: number }>('/api/example')).toEqual({
			value: 42
		});
		expect(fetch).toHaveBeenCalledWith('/api/example');
	});

	it.each([
		{ status: 503, body: '<html>Service unavailable</html>' },
		{ status: 503, body: JSON.stringify({ error: 'Service unavailable' }) },
		{ status: 404, body: '' }
	])(
		'rejects HTTP $status without parsing the response as application data',
		async ({ status, body }) => {
			const response = new Response(body, { status });
			const parseJson = vi.spyOn(response, 'json');
			vi.mocked(fetch).mockResolvedValue(response);
			await expect(fetcher('/api/example')).rejects.toMatchObject({ status });
			expect(parseJson).not.toHaveBeenCalled();
		}
	);

	it('propagates a network failure for SWR to handle', async () => {
		const error = new TypeError('Failed to fetch');
		vi.mocked(fetch).mockRejectedValue(error);
		await expect(fetcher('/api/example')).rejects.toBe(error);
	});

	it('rejects malformed JSON in a successful response', async () => {
		vi.mocked(fetch).mockResolvedValue(new Response('<html>Not JSON</html>'));
		await expect(fetcher('/api/example')).rejects.toThrow();
	});
});
