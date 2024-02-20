import { CalculationResultType } from '@interfaces/calculationResultType';
import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';

const generateRegon = (
	type: regonType = 'long'
): CalculationResultType<string> => {
	const range = regonRangeMap[type];
	const firstNumbers = generateRandomIntNumber(range[0], range[1]);
	const controlNumber = generateControlNumber(firstNumbers, type);
	return { result: `${firstNumbers}${controlNumber}` };
};

const generateControlNumber = (
	firstNumbers: number,
	type: regonType
): number => {
	let sumOfWeight = 0;
	const weights = regonWeightsMap[type];
	const numbersToString = firstNumbers.toString();

	for (let i = 0; i < weights.length; i++) {
		const multiplicationResult = weights[i] * Number(numbersToString[i]);
		sumOfWeight += multiplicationResult;
	}

	const moduloResult = sumOfWeight % 11;
	return moduloResult === 10 ? 0 : moduloResult;
};

export default generateRegon;

export type regonType = 'short' | 'long';

const regonRangeMap: Record<regonType, number[]> = {
	['short']: [100_000, 999_999],
	['long']: [10_000_000, 99_999_999]
};

const regonWeightsMap: Record<regonType, number[]> = {
	['short']: [2, 3, 4, 5, 6, 7],
	['long']: [8, 9, 2, 3, 4, 5, 6, 7]
};
