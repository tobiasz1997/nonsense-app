import { generateString } from '@utils/generators/stringGenerate';

describe('String Generator', () => {
	test('Should create correct string', () => {
		const nip = generateString(71, true);

		expect(nip.result).not.toBeNull();
		expect(nip.result).toHaveLength(71);
		expect(nip.result).toEqual(
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'
		);
		expect(typeof nip.result).toBe('string');
	});

	test('Should create correct string without white spaces', () => {
		const nip = generateString(61, false);

		expect(nip.result).not.toBeNull();
		expect(nip.result).toHaveLength(61);
		expect(nip.result).toEqual(
			'Loremipsumdolorsitamet,consecteturadipiscingelit.Sednonrisus.'
		);
		expect(typeof nip.result).toBe('string');
	});
});
