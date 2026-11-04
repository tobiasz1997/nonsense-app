import PeselOptions from '@components/features/Generators/Filters/PeselOptions';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import TypewriterText from '@components/ui/TypewriterText';
import { useAppSelector } from '@store/store';
import generatePesel from '@utils/generators/peselGenerator';
import { useTranslations } from 'next-intl';
import React, { FC, useEffect, useState } from 'react';

const PeselGenerator: FC = () => {
	const t = useTranslations();
	const [value, setValue] = useState<string>('');
	const peselOptions = useAppSelector((state) => state.peselSlice);

	useEffect(() => {
		handleGeneratePesel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGeneratePesel = () => {
		const result = generatePesel(
			peselOptions.minYear,
			peselOptions.maxYear,
			peselOptions.gender,
			peselOptions.divider
		);
		setValue(result?.result ?? '');
	};

	return (
		<CustomBox title={t('generators.peselTitle')}>
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="na-generate-result">
					<TypewriterText text={value} />
				</p>
				<div className="flex gap-3">
					<div>
						<CopyButton copyValue={value} />
					</div>
					<div className="flex-auto">
						<Button onClick={handleGeneratePesel}>
							{t('common.generate')}
						</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label={t('common.filters')}>
				<PeselOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default PeselGenerator;
