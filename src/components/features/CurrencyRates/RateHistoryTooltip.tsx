import { useFormatter, useTranslations } from 'next-intl';
import { ReactNode } from 'react';

export type RateHistoryPoint = {
	date: string;
	value: number;
	name: string;
	unit: string;
};

type RateHistoryTooltipProps = {
	id: string;
	point: RateHistoryPoint;
	fractionDigits: number;
	children?: ReactNode;
};

const RateHistoryTooltip = ({
	id,
	point,
	fractionDigits,
	children
}: RateHistoryTooltipProps) => {
	const t = useTranslations('currencyRates');
	const format = useFormatter();

	return (
		<div
			id={id}
			role="tooltip"
			className="rounded-lg bg-green-dark p-3 text-sm text-white shadow-lg"
		>
			{children ?? (
				<>
					<p className="mb-2 flex items-center gap-2 font-bold">
						<span
							aria-hidden="true"
							className="h-2 w-2 shrink-0 rounded-full bg-orange"
						/>
						{point.name} · {point.unit}
					</p>
					<dl className="space-y-1">
						<div>
							<dt className="inline">{t('historyDate')}: </dt>
							<dd className="inline">
								<time dateTime={point.date}>
									{format.dateTime(new Date(`${point.date}T12:00:00Z`), {
										dateStyle: 'medium'
									})}
								</time>
							</dd>
						</div>
						<div>
							<dt className="inline">{t('historyValue')}: </dt>
							<dd className="inline font-bold tabular-nums">
								{format.number(point.value, {
									minimumFractionDigits: fractionDigits,
									maximumFractionDigits: fractionDigits
								})}{' '}
								PLN
							</dd>
						</div>
					</dl>
				</>
			)}
		</div>
	);
};

export default RateHistoryTooltip;
