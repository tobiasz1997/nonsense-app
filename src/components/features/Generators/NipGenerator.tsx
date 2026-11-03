import NipOptions from '@components/features/Generators/Filters/NipOptions';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import TypewriterText from '@components/ui/TypewriterText';
import { useAppSelector } from '@store/store';
import generateNip from '@utils/generators/nipGenerator';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

const NipGenerator: FC = () => {
	const t = useTranslations();
	const [value, setValue] = useState<string>('');
	const nipOptions = useAppSelector((state) => state.nipSlice);

	useEffect(() => {
		handleGenerateNip();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGenerateNip = () => {
		const result = generateNip(nipOptions.divider);
		setValue(result?.result ?? '');
	};

	return (
		<CustomBox title={t('generators.nipTitle')}>
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="na-generate-result">
					<TypewriterText text={value} />
				</p>
				<div className="flex gap-3">
					<div>
						<CopyButton copyValue={value} />
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateNip}>{t('common.generate')}</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label={t('common.filters')}>
				<NipOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default NipGenerator;
