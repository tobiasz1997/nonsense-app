import { CalculationResultType } from '@interfaces/calculationResultType';
import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';

const generatePesel = (
	minYear: number = 1900,
	maxYear: number = 2023,
	gender?: genderType
): CalculationResultType<string> => {
	const year = generateRandomIntNumber(minYear, maxYear);
	const month = generateMonth(year);
	const day = generateDay(month, year);
	const ordinalNumbers = generateOrdinalNumber(gender);

	const formattedYear = takeLastTwoNumbersFromYear(year);
	const formattedMonth = addZeroIfNumberLengthIsTooShort(month);
	const formattedDay = addZeroIfNumberLengthIsTooShort(day);

	const controlNumber = generateControlNumber(
		formattedYear,
		formattedMonth,
		formattedDay,
		ordinalNumbers
	);

	return {
		result: `${formattedYear}${formattedMonth}${formattedDay}${ordinalNumbers}${controlNumber}`
	};
};

const generateMonth = (year: number): number => {
	let valueToAdd = 0;
	if (isBetween(year, 1800, 1899)) {
		valueToAdd += 80;
	} else if (isBetween(year, 1900, 1999)) {
		valueToAdd += 0;
	} else if (isBetween(year, 2000, 2099)) {
		valueToAdd += 20;
	} else if (isBetween(year, 2100, 2199)) {
		valueToAdd += 40;
	} else if (isBetween(year, 2200, 2299)) {
		valueToAdd += 60;
	}

	return generateRandomIntNumber(1, 12) + valueToAdd;
};

const isBetween = (
	value: number,
	smallerValue: number,
	higherValue: number
): boolean => {
	return value >= smallerValue && value <= higherValue;
};

const generateDay = (month: number, year: number): number => {
	const maxDay = getMaxDay(month, year);
	return generateRandomIntNumber(1, maxDay);
};

const getMaxDay = (month: number, year: number): number => {
	if (month === 2) {
		return year % 4 === 0 ? 29 : 28;
	} else if (month === 4 || month === 6 || month === 9 || month === 11) {
		return 30;
	} else {
		return 31;
	}
};

const generateOrdinalNumber = (gender?: genderType): number => {
	const firstThreeNumbers = generateRandomIntNumber(100, 999);
	const lastNumber = generateLastNumberForGender(gender);

	return Number(`${firstThreeNumbers}${lastNumber}`);
};

const generateLastNumberForGender = (gender?: genderType): number => {
	let genderNumber = 0;
	if (gender) {
		genderNumber += gender === 'male' ? 1 : 0;
	} else {
		genderNumber += generateRandomIntNumber(0, 1);
	}
	const value = generateRandomIntNumber(0, 9);

	return value % 2 === genderNumber
		? value
		: generateLastNumberForGender(gender);
};

const generateControlNumber = (
	partOfYear: string,
	partOfMonth: string,
	partOfDay: string,
	ordinal: number
): number => {
	let sumOfWeight = 0;
	const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
	const partOfPesel = `${partOfYear}${partOfMonth}${partOfDay}${ordinal}`;

	for (let i = 0; i < weights.length; i++) {
		const multiplicationResult = (
			weights[i] * Number(partOfPesel[i])
		).toString();
		sumOfWeight +=
			multiplicationResult.length === 1
				? Number(multiplicationResult)
				: Number(multiplicationResult.slice(-1));
	}

	const sumOfWeightToString = sumOfWeight.toString();

	return sumOfWeightToString.length === 1
		? sumOfWeightToString === '0'
			? 0
			: 10 - Number(sumOfWeightToString)
		: 10 - Number(sumOfWeightToString.slice(-1));
};

const takeLastTwoNumbersFromYear = (year: number): string => {
	return year.toString().slice(-2);
};

const addZeroIfNumberLengthIsTooShort = (value: number): string => {
	const formattedNumber = value.toString();
	return formattedNumber.length === 1 ? `0${formattedNumber}` : formattedNumber;
};

export default generatePesel;

type genderType = 'male' | 'female';
