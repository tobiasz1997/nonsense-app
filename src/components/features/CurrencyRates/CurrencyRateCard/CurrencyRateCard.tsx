import { NbpRateCode } from '@api/nbp.api';
import CurrencyCalculatorInputs from '@components/features/CurrencyRates/CurrencyRateCard/CurrencyCalculatorInputs';
import { useCurrencyCalculator } from '@components/features/CurrencyRates/CurrencyRateCard/useCurrencyCalculator';
import { getCurrencySummary } from '@components/features/CurrencyRates/currencyRatesHelpers';
import RateHistoryModal from '@components/features/CurrencyRates/RateHistoryModal';
import Button from '@components/ui/Button';
import {
	ArrowsRightLeftIcon,
	CalculatorIcon,
	ChartBarIcon
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useFormatter, useTranslations } from 'next-intl';
import { useId, useState } from 'react';

type CurrencyRateCardProps = {
	code: NbpRateCode;
	summary: NonNullable<ReturnType<typeof getCurrencySummary>>;
};

const GRAMS_PER_TROY_OUNCE = 31.1034768;

const CurrencyRateCard = ({ code, summary }: CurrencyRateCardProps) => {
	const t = useTranslations('currencyRates');
	const format = useFormatter();
	const calculatorId = useId();
	const [goldUnit, setGoldUnit] = useState<'ounce' | 'gram'>('ounce');
	const [isHistoryOpen, setIsHistoryOpen] = useState(false);
	const {
		isCalculatorOpen,
		amount,
		vat,
		parsedAmount,
		parsedVat,
		calculatedValue,
		hasValidResult,
		handleToggleCalculator,
		handleAmountChange,
		handleVatChange
	} = useCurrencyCalculator(summary.latest.value);

	const { latest, previous, difference, percentage } = summary;
	const fractionDigits = code === 'GOLD' ? 2 : 4;
	const direction =
		difference === undefined || difference === 0
			? 'unchanged'
			: difference > 0
				? 'increased'
				: 'decreased';
	const isCalculating = code !== 'GOLD' && isCalculatorOpen;
	const unitMultiplier =
		code === 'GOLD' && goldUnit === 'ounce' ? GRAMS_PER_TROY_OUNCE : 1;
	const displayedValue = latest.value * unitMultiplier;
	const displayedDifference =
		difference !== undefined ? difference * unitMultiplier : undefined;

	const handleToggleGoldUnit = () => {
		setGoldUnit((unit) => (unit === 'ounce' ? 'gram' : 'ounce'));
	};

	return (
		<article className="relative space-y-3 rounded-2xl bg-pistachio p-5 text-green-dark shadow-xl dark:bg-zinc-500 dark:text-pistachio">
			<div className="absolute right-16 top-3">
				<Button
					type="button"
					size="small"
					icon={<ChartBarIcon />}
					aria-label={t('openHistory', { name: t(code) })}
					aria-haspopup="dialog"
					onClick={() => setIsHistoryOpen(true)}
				/>
			</div>
			{code !== 'GOLD' && (
				<div className="absolute right-3 top-3">
					<Button
						type="button"
						size="small"
						icon={<CalculatorIcon />}
						aria-label={t(
							isCalculatorOpen ? 'closeCalculator' : 'openCalculator',
							{
								currency: code
							}
						)}
						aria-expanded={isCalculatorOpen}
						aria-controls={calculatorId}
						onClick={handleToggleCalculator}
					/>
				</div>
			)}
			{code === 'GOLD' && (
				<div className="absolute right-3 top-3">
					<Button
						type="button"
						size="small"
						icon={<ArrowsRightLeftIcon />}
						aria-label={t(
							goldUnit === 'ounce' ? 'showGoldGram' : 'showGoldOunce'
						)}
						onClick={handleToggleGoldUnit}
					/>
				</div>
			)}
			<h3 className="pr-24 font-bold">
				{t(code)}
				{code !== 'GOLD' && <> · {code}</>}
			</h3>
			{isCalculating ? (
				<p
					className="wrap-break-word text-2xl font-bold tabular-nums"
					aria-live="polite"
					aria-atomic="true"
				>
					{hasValidResult &&
					calculatedValue !== undefined &&
					parsedAmount !== undefined &&
					parsedVat !== undefined
						? t('calculationResult', {
								amount: format.number(parsedAmount, {
									maximumFractionDigits: 20
								}),
								currency: code,
								vat: format.number(parsedVat, { maximumFractionDigits: 20 }),
								result: format.number(calculatedValue, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							})
						: t('invalidCalculation')}
				</p>
			) : (
				<p className="text-2xl font-bold tabular-nums">
					{code === 'GOLD'
						? t(goldUnit === 'ounce' ? 'goldOunceUnit' : 'goldUnit')
						: `1 ${code}`}{' '}
					={' '}
					{format.number(displayedValue, {
						minimumFractionDigits: fractionDigits,
						maximumFractionDigits: fractionDigits
					})}{' '}
					PLN
				</p>
			)}
			{code !== 'GOLD' && (
				<CurrencyCalculatorInputs
					id={calculatorId}
					hidden={!isCalculatorOpen}
					code={code}
					amount={amount}
					vat={vat}
					onAmountChange={handleAmountChange}
					onVatChange={handleVatChange}
					isAmountInvalid={parsedAmount === undefined}
					isVatInvalid={parsedVat === undefined}
				/>
			)}
			{difference !== undefined &&
			displayedDifference !== undefined &&
			percentage !== undefined ? (
				<div className="space-y-1 text-sm">
					<p
						className={classNames('font-semibold tabular-nums', {
							'text-green-800 dark:text-green-300': difference > 0,
							'text-red-800 dark:text-red-300': difference < 0
						})}
					>
						<span aria-hidden="true">
							{difference > 0 ? '↑' : difference < 0 ? '↓' : '→'}{' '}
						</span>
						{t(direction)}:{' '}
						{format.number(displayedDifference, {
							minimumFractionDigits: fractionDigits,
							maximumFractionDigits: fractionDigits,
							signDisplay: 'exceptZero'
						})}{' '}
						PLN (
						{format.number(percentage / 100, {
							style: 'percent',
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
							signDisplay: 'exceptZero'
						})}
						)
					</p>
					<p>{t('comparison')}</p>
					{previous && (
						<time dateTime={previous.date}>
							{format.dateTime(new Date(`${previous.date}T12:00:00Z`), {
								dateStyle: 'medium'
							})}
						</time>
					)}
				</div>
			) : (
				<p className="text-sm">{t('noComparison')}</p>
			)}
			<p className="text-sm">
				{t(code === 'GOLD' ? 'goldDate' : 'rateDate')}{' '}
				<time dateTime={latest.date}>
					{format.dateTime(new Date(`${latest.date}T12:00:00Z`), {
						dateStyle: 'medium'
					})}
				</time>
			</p>
			{isHistoryOpen && (
				<RateHistoryModal
					name={t(code)}
					history={summary.rates}
					unit={
						code === 'GOLD'
							? t(goldUnit === 'ounce' ? 'goldOunceUnit' : 'goldUnit')
							: `1 ${code}`
					}
					unitMultiplier={unitMultiplier}
					fractionDigits={fractionDigits}
					onClose={() => setIsHistoryOpen(false)}
				/>
			)}
		</article>
	);
};

export default CurrencyRateCard;
