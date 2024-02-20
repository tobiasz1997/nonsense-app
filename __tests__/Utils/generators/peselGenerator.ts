import generatePesel from '@utils/generators/peselGenerator';

describe('Pesel Generator', () => {
	test('Should create correct pesel number', () => {
		const pesel = generatePesel();

		expect(pesel.result).not.toBeNull();
		expect(pesel.result).toHaveLength(11);
		expect(typeof pesel.result).toBe('string');
	});

	test('Should create correct pesel number with dividers', () => {
		const pesel = generatePesel(1900, 2000, null, true);
		const pattern = new RegExp('^\\d{2}-\\d{2}-\\d{2}-\\d{2}-\\d+$');

		expect(pesel.result).not.toBeNull();
		expect(pesel.result).toHaveLength(15);
		expect(pattern.test(pesel.result ?? '')).toBeTruthy();
		expect(typeof pesel.result).toBe('string');
	});
});
