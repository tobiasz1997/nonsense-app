import { CurrencyCode } from '@api/nbp.api';
import FormInput from '@components/ui/FormInput';
import { useTranslations } from 'next-intl';

type CurrencyCalculatorInputsProps = {
	id: string;
	hidden: boolean;
	code: CurrencyCode;
	amount: string;
	vat: string;
	onAmountChange: (value: string) => void;
	onVatChange: (value: string) => void;
	isAmountInvalid: boolean;
	isVatInvalid: boolean;
};

const CurrencyCalculatorInputs = ({
	id,
	hidden,
	code,
	amount,
	vat,
	onAmountChange,
	onVatChange,
	isAmountInvalid,
	isVatInvalid
}: CurrencyCalculatorInputsProps) => {
	const t = useTranslations('currencyRates');

	return (
		<div id={id} hidden={hidden} className="flex w-full gap-3">
			<div className="min-w-0 flex-3">
				<FormInput
					type="text"
					inputMode="decimal"
					label={t('amountLabel', { currency: code })}
					value={amount}
					onChange={(event) => onAmountChange(event.target.value)}
					aria-invalid={isAmountInvalid}
				/>
			</div>
			<div className="min-w-25 flex-1">
				<FormInput
					type="text"
					inputMode="decimal"
					label={t('vatLabel')}
					value={vat}
					onChange={(event) => onVatChange(event.target.value)}
					aria-invalid={isVatInvalid}
				/>
			</div>
		</div>
	);
};

export default CurrencyCalculatorInputs;
