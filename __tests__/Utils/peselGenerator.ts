import { generatePesel } from '@utils/generators/peselGenerator';

describe('Pesel Generator', () => {
	test('Should create correct pesel number', () => {
		const pesel = generatePesel();

		expect(pesel.result).not.toBeNull();
		expect(pesel.result).toHaveLength(11);
		expect(typeof pesel.result).toBe('string');
	});
});
