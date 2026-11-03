import ArrayOptions from '@components/features/Generators/Filters/ArrayOptions';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import TypewriterText from '@components/ui/TypewriterText';
import { useAppSelector } from '@store/store';
import generateArray from '@utils/generators/arrayGenerator';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

const ArrayGenerator: FC = () => {
	const t = useTranslations();
	const [value, setValue] = useState<string>('');
	const arrayOptions = useAppSelector((state) => state.arraySlice);

	useEffect(() => {
		handleGenerateArray();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGenerateArray = () => {
		const result = generateArray(
			arrayOptions.count,
			arrayOptions.min,
			arrayOptions.max,
			arrayOptions.orderType,
			arrayOptions.sorted,
			arrayOptions.resultType
		);
		setValue(result?.result ?? '');
	};

	return (
		<CustomBox title={t('generators.arrayTitle')}>
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="na-generate-result">
					<TypewriterText text={value} />
				</p>
				<div className="flex gap-3">
					<div>
						<CopyButton copyValue={value} />
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateArray}>
							{t('common.generate')}
						</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label={t('common.filters')}>
				<ArrayOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default ArrayGenerator;
