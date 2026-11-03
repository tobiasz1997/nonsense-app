import InputNumberForm from '@components/features/Algorithms/Utils/InputNumberForm';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import CustomBox from '@components/ui/CustomBox';
import { CalculationResultType } from '@interfaces/calculationResultType';
import { calculateFibonacci } from '@utils/algorithmsFunctions';
import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

const Fibonacci: FC = () => {
	const t = useTranslations('algorithms');
	const [value, setValue] = useState<CalculationResultType<number>>();

	return (
		<CustomBox title={t('fibonacci')}>
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// {t('input')}</div>
					<var className="na-variable">x = 7</var>
					<div className="na-comment">// {t('output')}</div>
					<samp className="na-sample">13</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<InputNumberForm
						onSubmit={(number) => setValue(calculateFibonacci(number))}
					/>
					<OutputValue
						result={value?.result?.toString()}
						error={value?.error ? t('negativeValue') : undefined}
					/>
				</div>
			</div>
		</CustomBox>
	);
};

export default Fibonacci;
