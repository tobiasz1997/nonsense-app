import { NbpRateCode, useGetCurrencyRates } from '@api/nbp.api';
import CurrencyRateCard from '@components/features/CurrencyRates/CurrencyRateCard/CurrencyRateCard';
import { getCurrencySummary } from '@components/features/CurrencyRates/currencyRatesHelpers';
import Loader from '@components/ui/Loader';
import { useTranslations } from 'next-intl';

const CURRENCIES: NbpRateCode[] = ['GBP', 'EUR', 'USD', 'GOLD'];

const CurrencyRates = () => {
	const t = useTranslations('currencyRates');
	const { data, error } = useGetCurrencyRates();

	return (
		<section className="w-full space-y-4" aria-label={t('title')}>
			<h2 className="text-xl font-bold text-orange sm:text-3xl">
				{t('title')}
			</h2>
			{!data ? (
				<Loader error={error} />
			) : (
				<>
					{error && <p role="alert">{t('refreshError')}</p>}
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
						{CURRENCIES.map((code) => {
							const summary = getCurrencySummary(data, code);
							if (!summary) {
								return null;
							}
							return (
								<CurrencyRateCard key={code} code={code} summary={summary} />
							);
						})}
					</div>
				</>
			)}
			<p className="text-sm text-green-dark dark:text-pistachio">
				{t('source')}{' '}
				<a
					href="https://nbp.pl"
					target="_blank"
					rel="noopener noreferrer"
					className="rounded underline focus-visible:outline-2 focus-visible:outline-offset-4"
				>
					{t('nbp')}
				</a>
			</p>
		</section>
	);
};

export default CurrencyRates;
