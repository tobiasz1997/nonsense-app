import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';

describe('Shared Generator', () => {
	describe('Should generate correct random numbers', () => {
		it.each([
			{ min: 0, max: 9, length: 1 },
			{ min: 10, max: 99, length: 2 },
			{ min: 100, max: 999, length: 3 },
			{ min: 1_000, max: 9_999, length: 4 },
			{ min: 10_000, max: 99_999, length: 5 },
			{ min: 100_000, max: 999_999, length: 6 },
			{ min: 1_000_000, max: 9_999_999, length: 7 }
		])(
			'should generate correct random number between $min and $max',
			({ min, max, length }) => {
				const result = generateRandomIntNumber(min, max);

				expect(result.toString()).toHaveLength(length);
				expect(typeof result).toBe('number');
			}
		);
	});
});
