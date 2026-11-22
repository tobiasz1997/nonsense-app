import { CurrencyRate } from '@api/nbp.api';
import RateHistoryChart from '@components/features/CurrencyRates/RateHistoryChart';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { useTranslations } from 'next-intl';

type RateHistoryModalProps = {
	name: string;
	history: CurrencyRate[];
	unit: string;
	unitMultiplier: number;
	fractionDigits: number;
	onClose: () => void;
};

const RateHistoryModal = ({
	name,
	history,
	unit,
	unitMultiplier,
	fractionDigits,
	onClose
}: RateHistoryModalProps) => {
	const t = useTranslations('currencyRates');

	return (
		<Modal>
			<ModalBox onClose={onClose}>
				<div className="mb-6 pr-8">
					<h2 className="text-xl font-bold text-orange sm:text-3xl">
						{t('historyTitle', { name })}
					</h2>
					<p className="mt-2 text-sm text-green-dark dark:text-pistachio">
						{t('historyPeriod')} · {unit} · PLN
					</p>
				</div>
				<RateHistoryChart
					name={name}
					unit={unit}
					history={history}
					unitMultiplier={unitMultiplier}
					fractionDigits={fractionDigits}
				/>
				<p className="mt-6 text-sm text-green-dark dark:text-pistachio">
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
			</ModalBox>
		</Modal>
	);
};

export default RateHistoryModal;
