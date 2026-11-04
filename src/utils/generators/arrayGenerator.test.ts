import arrayGenerator from '@utils/generators/arrayGenerator';

describe('Array Generator', () => {
	describe('Count number', () => {
		test('Should create correct length of number', () => {
			const array = arrayGenerator(10, 2, 100, 'sequential', false, 'array');

			expect(array.result).toHaveLength(32);
			expect(JSON.parse(array.result ?? '')).toHaveLength(10);
		});
	});

	describe('Min max values', () => {
		test('Should create correct array of numbers with correct range', () => {
			const array = arrayGenerator(1000, -50, 50, 'random', false, 'array');
			const parsedArray = JSON.parse(array.result ?? '');

			for (const number of parsedArray) {
				expect(typeof number).toBe('number');
				expect(number).toBeGreaterThanOrEqual(-50);
				expect(number).toBeLessThanOrEqual(50);
			}
		});
	});

	describe('Order type', () => {
		test('Should create correct array of numbers with random order', () => {
			const array = arrayGenerator(20, 0, 9, 'random', false, 'comma');
			const pattern = new RegExp(
				'^\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d,\\d$'
			);

			expect(pattern.test(array.result ?? '')).toBeTruthy();
		});

		test('Should create correct array of numbers with sequential order', () => {
			const array = arrayGenerator(20, 0, 9, 'sequential', false, 'array');

			expect(array.result).toEqual(
				'[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]'
			);
		});
	});

	describe('Sort', () => {
		test('Should create sorted array of numbers', () => {
			const array = arrayGenerator(1000, 0, 100, 'random', true, 'array');
			const parsedArray = JSON.parse(array.result ?? '');

			for (let i = 0; i < parsedArray.length; i++) {
				if (i === parsedArray.length - 1) {
					return;
				}
				expect(parsedArray[i]).toBeLessThanOrEqual(parsedArray[i + 1]);
			}
		});
	});

	describe('Result type', () => {
		test('Should create correct string with array type', () => {
			const array = arrayGenerator(5, 0, 9, 'sequential', false, 'array');

			expect(array.result).toEqual('[0, 1, 2, 3, 4]');
		});

		test('Should create correct string with comma type', () => {
			const array = arrayGenerator(5, 0, 9, 'sequential', false, 'comma');

			expect(array.result).toEqual('0,1,2,3,4');
		});

		test('Should create correct string with semicolon type', () => {
			const array = arrayGenerator(5, 0, 9, 'sequential', false, 'semicolon');

			expect(array.result).toEqual('0;1;2;3;4');
		});
	});
});
