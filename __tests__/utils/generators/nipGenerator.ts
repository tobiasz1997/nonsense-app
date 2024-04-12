import generateNip from '@utils/generators/nipGenerator';

describe('NIP Generator', () => {
	test('Should create correct NIP number', () => {
		const nip = generateNip();

		expect(nip.result).not.toBeNull();
		expect(nip.result).toHaveLength(10);
		expect(typeof nip.result).toBe('string');
	});

	test('Should create correct NIP number with dividers', () => {
		const nip = generateNip(true);
		const pattern = new RegExp('^\\d{3}-\\d{3}-\\d{2}-\\d{2}$');

		expect(nip.result).not.toBeNull();
		expect(nip.result).toHaveLength(13);
		expect(pattern.test(nip.result ?? '')).toBeTruthy();
		expect(typeof nip.result).toBe('string');
	});
});
