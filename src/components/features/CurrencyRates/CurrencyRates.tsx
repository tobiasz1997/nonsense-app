import {
	NbpRateCode,
	useGetCurrencyRates,
	useGetGoldRates
} from '@api/nbp.api';
import CurrencyRateCard from '@components/features/CurrencyRates/CurrencyRateCard/CurrencyRateCard';
import { getCurrencySummary } from '@components/features/CurrencyRates/currencyRatesHelpers';
import Loader from '@components/ui/Loader';
import { useTranslations } from 'next-intl';

const CURRENCIES: NbpRateCode[] = ['EUR', 'GBP', 'USD', 'GOLD'];

const CurrencyRates = () => {
	const t = useTranslations('currencyRates');
	const { data, error } = useGetCurrencyRates();
	const gold = useGetGoldRates();

	return (
		<section className="w-full space-y-4" aria-label={t('title')}>
			<h2 className="text-xl font-bold text-orange sm:text-3xl">
				{t('title')}
			</h2>
			{error && data && <p role="alert">{t('currencyRefreshError')}</p>}
			{gold.error && gold.data && <p role="alert">{t('goldRefreshError')}</p>}
			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{CURRENCIES.map((code) => {
					const sourceData = code === 'GOLD' ? gold.data : data;
					const sourceError = code === 'GOLD' ? gold.error : error;
					const summary = sourceData
						? getCurrencySummary(sourceData, code)
						: undefined;
					if (!summary) {
						return (
							<article
								key={code}
								className="flex min-h-48 flex-col gap-3 rounded-2xl bg-pistachio p-5 text-green-dark shadow-xl dark:bg-zinc-500 dark:text-pistachio"
							>
								<h3 className="font-bold">
									{t(code)}
									{code !== 'GOLD' && <> · {code}</>}
								</h3>
								<div className="flex flex-1 items-center justify-center text-center">
									{sourceError ? (
										<p role="alert">{t('loadRateError', { name: t(code) })}</p>
									) : sourceData ? (
										<p>{t('noRate', { name: t(code) })}</p>
									) : (
										<div
											aria-live="polite"
											className="flex w-full items-center justify-center"
										>
											<p className="sr-only">
												{t('loadingRate', { name: t(code) })}
											</p>
											<Loader />
										</div>
									)}
								</div>
							</article>
						);
					}
					return <CurrencyRateCard key={code} code={code} summary={summary} />;
				})}
			</div>
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
