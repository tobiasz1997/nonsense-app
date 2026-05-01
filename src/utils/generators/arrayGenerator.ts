import { CalculationResultType } from '@interfaces/calculationResultType';
import { calculateInsertionSort } from '@utils/algorithmsFunctions';
import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';

const generateArray = (
	count: number,
	min: number,
	max: number,
	orderType: orderType,
	sorted: boolean,
	resultType: resultType
): CalculationResultType<string> => {
	let result: number[] = [];

	if (orderType === 'sequential') {
		generateSequentialArray(result, count, min);
	} else {
		generateRandomArray(result, count, min, max);
	}

	if (sorted) {
		result = calculateInsertionSort(result).result!;
	}

	return { result: mapArrayToString(result, resultType) };
};

const generateSequentialArray = (
	result: number[],
	count: number,
	minValue: number
) => {
	for (let i = 0; i < count; i++) {
		result.push(minValue + i);
	}
};

const generateRandomArray = (
	result: number[],
	count: number,
	minValue: number,
	maxValue: number
) => {
	for (let i = 0; i < count; i++) {
		const randomNumber = generateRandomIntNumber(minValue, maxValue);
		result.push(randomNumber);
	}
};

const mapArrayToString = (result: number[], resultType: resultType) => {
	switch (resultType) {
		case 'semicolon':
		case 'comma':
			return `${result.map(String).join(resultTypeMap[resultType])}`;
		default:
			return `[${result.map(String).join(resultTypeMap[resultType])}]`;
	}
};

export type orderType = 'random' | 'sequential';
export type resultType = 'array' | 'semicolon' | 'comma';

const resultTypeMap: Record<resultType, string> = {
	['array']: ', ',
	['semicolon']: ';',
	['comma']: ','
};

export default generateArray;
