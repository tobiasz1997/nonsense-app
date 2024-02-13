import generateNip from '@utils/generators/nipGenerator';

describe('NIP Generator', () => {
	test('Should create correct NIP number', () => {
		const nip = generateNip();

		expect(nip.result).not.toBeNull();
		expect(nip.result).toHaveLength(10);
		expect(typeof nip.result).toBe('string');
	});
});
