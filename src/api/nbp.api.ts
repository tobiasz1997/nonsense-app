import { API_URLS } from '@api/api-urls.const';
import { fetcher } from '@utils/fetcher';
import useSWR from 'swr';

export type CurrencyCode = 'GBP' | 'EUR' | 'USD';
export type NbpRateCode = CurrencyCode | 'GOLD';

export interface CurrencyRate {
	code: NbpRateCode;
	date: string;
	value: number;
}

const CURRENCY_CODES: CurrencyCode[] = ['GBP', 'EUR', 'USD'];
const REFRESH_INTERVAL = 6 * 60 * 60 * 1000;

export const useGetCurrencyRates = () => {
	return useSWR<CurrencyRate[], Error>(
		'api/nbp/currency-rates',
		getCurrencyRates,
		{ refreshInterval: REFRESH_INTERVAL, dedupingInterval: REFRESH_INTERVAL }
	);
};

export const useGetGoldRates = () => {
	return useSWR<CurrencyRate[], Error>('api/nbp/gold-rates', getGoldRates, {
		refreshInterval: REFRESH_INTERVAL,
		dedupingInterval: REFRESH_INTERVAL
	});
};

const getCurrencyRates = async (): Promise<CurrencyRate[]> => {
	const { startDate, endDate } = getHistoryDateRange();
	const data = await fetcher<unknown>(
		`${API_URLS.nbp}/${startDate}/${endDate}/?format=json`
	);

	if (!Array.isArray(data) || data.length === 0) {
		throw new Error('Invalid NBP response');
	}

	const history: CurrencyRate[] = [];
	for (const table of data) {
		if (
			!isRecord(table) ||
			typeof table.effectiveDate !== 'string' ||
			!/^\d{4}-\d{2}-\d{2}$/.test(table.effectiveDate) ||
			!Array.isArray(table.rates)
		) {
			throw new Error('Invalid NBP table');
		}

		for (const code of CURRENCY_CODES) {
			const rate: unknown = table.rates.find(
				(entry: unknown) => isRecord(entry) && entry.code === code
			);
			if (
				!isRecord(rate) ||
				typeof rate.mid !== 'number' ||
				!Number.isFinite(rate.mid) ||
				rate.mid <= 0
			) {
				throw new Error('Invalid NBP currency rate');
			}
			history.push({ code, date: table.effectiveDate, value: rate.mid });
		}
	}

	return history.sort((first, second) => first.date.localeCompare(second.date));
};

const getGoldRates = async (): Promise<CurrencyRate[]> => {
	const { startDate, endDate } = getHistoryDateRange();
	const goldData = await fetcher<unknown>(
		`${API_URLS.nbpGold}/${startDate}/${endDate}/?format=json`
	);
	const history: CurrencyRate[] = [];

	if (!Array.isArray(goldData) || goldData.length === 0) {
		throw new Error('Invalid NBP gold response');
	}

	for (const entry of goldData) {
		if (
			!isRecord(entry) ||
			typeof entry.data !== 'string' ||
			!/^\d{4}-\d{2}-\d{2}$/.test(entry.data) ||
			typeof entry.cena !== 'number' ||
			!Number.isFinite(entry.cena) ||
			entry.cena <= 0
		) {
			throw new Error('Invalid NBP gold price');
		}
		history.push({ code: 'GOLD', date: entry.data, value: entry.cena });
	}

	return history.sort((first, second) => first.date.localeCompare(second.date));
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null;
};

const getHistoryDateRange = () => {
	const endDate = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Europe/Warsaw',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date());
	const start = new Date(`${endDate}T12:00:00Z`);
	start.setUTCDate(start.getUTCDate() - 29);
	const startDate = start.toISOString().slice(0, 10);
	return { startDate, endDate };
};
