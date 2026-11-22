import { NbpRateCode, CurrencyRate } from '@api/nbp.api';

export const getCurrencySummary = (
	history: CurrencyRate[],
	code: NbpRateCode
) => {
	const rates = history.filter((rate) => rate.code === code);
	const latest = rates.at(-1);
	const previous = rates.at(-2);

	if (!latest) {
		return undefined;
	}

	const difference = previous
		? Number((latest.value - previous.value).toFixed(4))
		: undefined;
	const percentage =
		previous && difference !== undefined
			? (difference / previous.value) * 100
			: undefined;

	return { latest, previous, difference, percentage, rates };
};
