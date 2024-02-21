import { CalculationResultType } from '@interfaces/calculationResultType';
import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';

const generateNip = (divider = false): CalculationResultType<string> => {
	const firstNineNumbers = generateRandomIntNumber(100_000_000, 999_999_999);
	const controlNumber = generateControlNumber(firstNineNumbers);
	return { result: createFinalNip(firstNineNumbers, controlNumber, divider) };
};

const generateControlNumber = (firstNumbers: number): number => {
	let sumOfWeight = 0;
	const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
	const numbersToString = firstNumbers.toString();

	for (let i = 0; i < weights.length; i++) {
		const multiplicationResult = weights[i] * Number(numbersToString[i]);
		sumOfWeight += multiplicationResult;
	}

	const moduloResult = sumOfWeight % 11;

	return moduloResult === 10 ? 0 : moduloResult;
};

const createFinalNip = (
	firstNineNumbers: number,
	controlNumber: number,
	divider: boolean
): string => {
	const result = `${firstNineNumbers}${controlNumber}`;
	return divider
		? `${result.slice(0, 3)}-${result.slice(3, 6)}-${result.slice(
				6,
				8
		  )}-${result.slice(8, 10)}`
		: result;
};

export default generateNip;
