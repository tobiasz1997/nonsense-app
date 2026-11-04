vi.mock('delay', async (importOriginal) => {
	const actual = await importOriginal<typeof import('delay')>();
	return {
		...actual,
		default: vi.fn(actual.createDelay({ setTimeout, clearTimeout }))
	};
});
