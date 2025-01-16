import { SelectOption } from '@interfaces/selectOption';

const years: number[] = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

export const yearsLists: SelectOption[] = years.map(
	(year) => ({ label: year.toString(), value: year }) as SelectOption
);
