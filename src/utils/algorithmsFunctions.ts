import { CalculationResultType } from '@interfaces/calculationResultType';

export const calculateFibonacci = (
	input: number
): CalculationResultType<number> => {
	if (input < 0) {
		return { result: null, error: 'Negative value' };
	}

	if (input <= 1) {
		return { result: input };
	}

	let number0 = 0;
	let number1 = 1;
	let current = 0;

	for (let i = 2; i <= input; i++) {
		current = number0 + number1;
		number0 = number1;
		number1 = current;
	}

	return { result: current };
};

export const calculateFibonacciRecursion = (
	input: number
): CalculationResultType<number> => {
	if (input < 0) {
		return { result: null, error: 'Negative value' };
	}

	function calculateFibonacci(number: number): number {
		if (number <= 1) {
			return number;
		}

		return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
	}

	return { result: calculateFibonacci(input) };
};

export const calculateBinarySearch = (
	input: Array<number>,
	target: number
): CalculationResultType<string> => {
	let startIndex = 0;
	let endIndex = input.length - 1;

	while (startIndex <= endIndex) {
		const middleIndex = Math.floor((startIndex + endIndex) / 2);

		if (input[middleIndex] === target) {
			return {
				result: `Target value ${target} is exist in ${middleIndex} index in array.`
			};
		} else if (input[middleIndex] < target) {
			startIndex = middleIndex + 1;
		} else if (input[middleIndex] > target) {
			endIndex = middleIndex - 1;
		}
	}

	return {
		result: `No target value ${target} in array.`
	};
};

export const calculateInsertionSort = (
	input: Array<number>
): CalculationResultType<Array<number>> => {
	//TODO: do without array
	const array = [...input];
	for (let i = 1; i < array.length; i++) {
		if (array[i - 1] > array[i]) {
			for (let y = i; y > 0; y--) {
				if (array[y - 1] > array[y]) {
					let value = array[y];
					array[y] = array[y - 1];
					array[y - 1] = value;
				}
			}
		}
	}

	return { result: array };
};

export const calculateSelectionSort = (
	input: Array<number>
): CalculationResultType<Array<number>> => {
	let array = [...input];

	for (let i = 0; i < array.length - 1; i++) {
		let smallestValueIndex = i;
		for (let y = i + 1; y < array.length; y++) {
			if (array[smallestValueIndex] > array[y]) {
				smallestValueIndex = y;
			}
		}
		let valueInMainIndex = array[i];
		array[i] = array[smallestValueIndex];
		array[smallestValueIndex] = valueInMainIndex;
	}

	return { result: array };
};
