import { CurrencyRate } from '@api/nbp.api';
import RateHistoryTooltip, {
	RateHistoryPoint
} from '@components/features/CurrencyRates/RateHistoryTooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useFormatter, useTranslations } from 'next-intl';
import { ReactNode, useId, useState } from 'react';

type RateHistoryChartProps = {
	history: CurrencyRate[];
	unitMultiplier: number;
	fractionDigits: number;
	name: string;
	unit: string;
	renderTooltip?: (point: RateHistoryPoint) => ReactNode;
};

const WIDTH = 640;
const HEIGHT = 240;
const PADDING = 16;

const RateHistoryChart = ({
	history,
	unitMultiplier,
	fractionDigits,
	name,
	unit,
	renderTooltip
}: RateHistoryChartProps) => {
	const t = useTranslations('currencyRates');
	const format = useFormatter();
	const chartId = useId();
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const first = history.at(0);
	const last = history.at(-1);
	if (!first || !last) {
		return <p>{t('noHistory')}</p>;
	}

	const values = history.map((rate) => rate.value * unitMultiplier);
	const minimum = Math.min(...values);
	const maximum = Math.max(...values);
	const padding = (maximum - minimum) * 0.1 || maximum * 0.01 || 1;
	const lowerBound = minimum - padding;
	const upperBound = maximum + padding;
	const startTime = Date.parse(first.date);
	const duration = Date.parse(last.date) - startTime;
	const change = (last.value - first.value) / first.value;
	const points = history.map((rate) => ({
		date: rate.date,
		value: rate.value * unitMultiplier,
		x:
			duration === 0
				? WIDTH / 2
				: PADDING +
					((Date.parse(rate.date) - startTime) / duration) *
						(WIDTH - PADDING * 2),
		y:
			HEIGHT -
			PADDING -
			((rate.value * unitMultiplier - lowerBound) / (upperBound - lowerBound)) *
				(HEIGHT - PADDING * 2)
	}));
	const numberOptions = {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	};
	const minimumLabel = `${format.number(minimum, numberOptions)} PLN`;
	const maximumLabel = `${format.number(maximum, numberOptions)} PLN`;
	const changeLabel = format.number(change, {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		signDisplay: 'exceptZero'
	});

	const yTicks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => ({
		value: upperBound - fraction * (upperBound - lowerBound),
		y: PADDING + fraction * (HEIGHT - PADDING * 2)
	}));
	const xTicks = duration === 0 ? [0] : [0, 0.5, 1];
	const selectedPoint = points.find((point) => point.date === selectedDate);
	const tooltipId = `${chartId}-tooltip`;
	const tooltipPoint = selectedPoint
		? { date: selectedPoint.date, value: selectedPoint.value, name, unit }
		: undefined;

	const handleSelectPoint = (date: string) => {
		setSelectedDate((current) => (current === date ? null : date));
	};

	return (
		<figure className="min-w-0 space-y-4 text-green-dark dark:text-pistachio">
			<div className="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-x-4">
				<div className="relative hidden min-w-16 text-right text-[10px] tabular-nums sm:block sm:text-xs">
					{yTicks.map(({ value, y }) => (
						<span
							key={y}
							className="absolute right-0 -translate-y-1/2 whitespace-nowrap"
							style={{ top: `${(y / HEIGHT) * 100}%` }}
						>
							{format.number(value, numberOptions)}
						</span>
					))}
				</div>
				<div className="relative min-w-0">
					<svg
						viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
						preserveAspectRatio="none"
						aria-labelledby={`${chartId}-title ${chartId}-description`}
						className="h-48 w-full rounded-lg bg-white/40 dark:bg-black/10 sm:h-64"
					>
						<title id={`${chartId}-title`}>{t('historyPeriod')}</title>
						<desc id={`${chartId}-description`}>
							{t('chartDescription', {
								minimum: minimumLabel,
								maximum: maximumLabel,
								change: changeLabel
							})}
						</desc>
						{yTicks.map(({ y }) => (
							<line
								key={y}
								x1={PADDING}
								x2={WIDTH - PADDING}
								y1={y}
								y2={y}
								stroke="currentColor"
								vectorEffect="non-scaling-stroke"
								className="opacity-15"
							/>
						))}
						<path
							d={`M ${PADDING} ${PADDING} V ${HEIGHT - PADDING} H ${WIDTH - PADDING}`}
							fill="none"
							stroke="currentColor"
							vectorEffect="non-scaling-stroke"
							className="opacity-40"
						/>
						<polyline
							points={points.map(({ x, y }) => `${x},${y}`).join(' ')}
							fill="none"
							stroke="currentColor"
							strokeWidth={2.5}
							vectorEffect="non-scaling-stroke"
							strokeLinejoin="round"
							strokeLinecap="round"
							className="text-orange dark:text-yellow"
						/>
						{points.map(({ x, y, date }) => (
							<ellipse
								key={date}
								cx={x}
								cy={y}
								rx={3}
								ry={3}
								fill="currentColor"
								className="text-orange dark:text-yellow"
							/>
						))}
					</svg>
					{points.map(({ x, y, date, value }) => (
						<button
							key={date}
							type="button"
							aria-label={t('historyPointLabel', {
								date: format.dateTime(new Date(`${date}T12:00:00Z`), {
									dateStyle: 'medium'
								}),
								value: format.number(value, numberOptions)
							})}
							aria-pressed={selectedDate === date}
							aria-describedby={selectedDate === date ? tooltipId : undefined}
							onClick={(event) => {
								const bounds =
									event.currentTarget.parentElement?.getBoundingClientRect();
								if (!bounds || event.detail === 0) {
									handleSelectPoint(date);
									return;
								}
								const distance = (point: { x: number; y: number }) =>
									Math.hypot(
										(point.x / WIDTH) * bounds.width -
											(event.clientX - bounds.left),
										(point.y / HEIGHT) * bounds.height -
											(event.clientY - bounds.top)
									);
								const nearest = points.reduce((closest, point) =>
									distance(point) < distance(closest) ? point : closest
								);
								handleSelectPoint(nearest.date);
							}}
							onKeyDown={(event) => {
								if (event.key === 'Escape' && selectedPoint) {
									event.preventDefault();
									event.stopPropagation();
									setSelectedDate(null);
								}
							}}
							style={{
								left: `${(x / WIDTH) * 100}%`,
								top: `${(y / HEIGHT) * 100}%`
							}}
							className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-orange/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
						>
							<span
								aria-hidden="true"
								className={
									selectedDate === date
										? 'h-2 w-2 rounded-full bg-orange ring-2 ring-green-dark dark:bg-yellow dark:ring-pistachio'
										: 'h-2 w-2 rounded-full bg-transparent'
								}
							/>
						</button>
					))}
					{selectedPoint && tooltipPoint && (
						<div
							className="pointer-events-none absolute z-20 w-56 max-w-[calc(100%-1rem)]"
							style={{
								left: `clamp(0.5rem, ${(selectedPoint.x / WIDTH) * 100}%, max(0.5rem, calc(100% - 14.5rem)))`,
								...(selectedPoint.y < HEIGHT / 2
									? { top: `calc(${(selectedPoint.y / HEIGHT) * 100}% + 1rem)` }
									: {
											bottom: `calc(${100 - (selectedPoint.y / HEIGHT) * 100}% + 1rem)`
										})
							}}
						>
							<RateHistoryTooltip
								id={tooltipId}
								point={tooltipPoint}
								fractionDigits={fractionDigits}
							>
								{renderTooltip?.(tooltipPoint)}
							</RateHistoryTooltip>
						</div>
					)}
				</div>
				<div className="group relative hidden items-start justify-end sm:flex">
					<button
						type="button"
						aria-label={t('historyAxesInfo')}
						aria-describedby={`${chartId}-axes-info`}
						onClick={(event) => event.currentTarget.focus()}
						className="flex h-6 w-6 cursor-help items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
					>
						<InformationCircleIcon aria-hidden="true" className="h-5 w-5" />
					</button>
					<div
						id={`${chartId}-axes-info`}
						role="tooltip"
						className="pointer-events-none invisible absolute bottom-full left-0 z-30 mb-2 w-64 max-w-[calc(100vw-4rem)] rounded-lg bg-green-dark p-3 text-sm text-white shadow-lg group-focus-within:visible group-hover:visible"
					>
						<p>{t('historyXAxisDescription')}</p>
						<p className="mt-1">{t('historyYAxisDescription', { unit })}</p>
					</div>
				</div>
				<div className="relative hidden h-6 text-[10px] sm:block sm:text-xs">
					{xTicks.map((fraction) => {
						const date = new Date(startTime + fraction * duration);
						return (
							<time
								key={fraction}
								dateTime={date.toISOString().slice(0, 10)}
								className="absolute whitespace-nowrap"
								style={{
									left: `${duration === 0 ? 50 : ((PADDING + fraction * (WIDTH - PADDING * 2)) / WIDTH) * 100}%`,
									transform:
										fraction === 0 && duration !== 0
											? undefined
											: fraction === 1
												? 'translateX(-100%)'
												: 'translateX(-50%)'
								}}
							>
								{format.dateTime(date, {
									day: '2-digit',
									month: '2-digit',
									timeZone: 'UTC'
								})}
							</time>
						);
					})}
				</div>
			</div>
			<figcaption className="grid grid-cols-3 gap-3 text-sm">
				<p>
					{t('historyMinimum')}
					<strong className="block tabular-nums">{minimumLabel}</strong>
				</p>
				<p>
					{t('historyMaximum')}
					<strong className="block tabular-nums">{maximumLabel}</strong>
				</p>
				<p>
					{t('historyChange')}
					<strong className="block tabular-nums">{changeLabel}</strong>
				</p>
			</figcaption>
		</figure>
	);
};

export default RateHistoryChart;
