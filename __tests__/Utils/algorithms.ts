import {
	calculateBinarySearch,
	calculateFibonacci,
	calculateInsertionSort,
	calculateSelectionSort
} from '@utils/algorithmsFunctions';

describe('Algorithms', () => {
	describe('Fibonacci', () => {
		it.each([
			{ value: 7, expected: 13 },
			{ value: 33, expected: 3524578 },
			{ value: 0, expected: 0 },
			{ value: 4, expected: 3 }
		])(
			'should return $expected when input is equal $value',
			({ value, expected }) =>
				expect(calculateFibonacci(value).result).toBe(expected)
		);
	});

	describe('Binary search', () => {
		it.each([
			{ array: [1, 2, 3, 4, 5, 6, 7, 8], target: 3, expected: 2 },
			{ array: [4, 23, 33, 34, 65, 126, 187, 198], target: 187, expected: 6 }
		])(
			'should return index: $expected when array: $array and target: $target',
			({ array, target, expected }) =>
				expect(calculateBinarySearch(array, target).result).toBe(
					`Target value ${target} is exist in ${expected} index in array.`
				)
		);

		it.each([
			{ array: [1, 2, 3, 4, 5, 6, 7, 8], target: 12 },
			{ array: [4, 23, 33, 34, 65, 126, 187, 198], target: 186 }
		])(
			'should return null because target: $target is not in array: $array',
			({ array, target }) =>
				expect(calculateBinarySearch(array, target).result).toBe(
					`No target value ${target} in array.`
				)
		);
	});

	describe('Insertion Sort', () => {
		it.each([
			{ array: [4, 1, 3, 2], expected: [1, 2, 3, 4] },
			{
				array: [4, 22, 8, 77, 3, 15, 1, 8, 2, 13, 7, 6, 5],
				expected: [1, 2, 3, 4, 6, 7, 8, 8, 13, 15, 22, 77]
			}
		])('should return sorted array: $expected', ({ array, expected }) => {
			const sort = calculateInsertionSort(array).result;

			expect(sort).not.toBeNull();
			expect((sort ?? [])[0]).toBe(expected[0]);
			expect((sort ?? [])[array.length - 1]).toBe(
				expected[expected.length - 1]
			);
		});
	});

	describe('Selection Sort', () => {
		it.each([
			{ array: [4, 1, 3, 2], expected: [1, 2, 3, 4] },
			{
				array: [12, 5, 33, 22, 17, 44, 2],
				expected: [2, 5, 12, 17, 22, 33, 44]
			}
		])('should return sorted array: $expected', ({ array, expected }) => {
			const sort = calculateSelectionSort(array).result;

			expect(sort).not.toBeNull();
			expect((sort ?? [])[0]).toBe(expected[0]);
			expect((sort ?? [])[array.length - 1]).toBe(
				expected[expected.length - 1]
			);
		});
	});
});
