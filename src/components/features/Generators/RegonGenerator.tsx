import RegonOptions from '@components/features/Generators/Filters/RegonOptions';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import TypewriterText from '@components/ui/TypewriterText';
import { useAppSelector } from '@store/store';
import generateRegon from '@utils/generators/regonGenerator';
import React, { FC, useEffect, useState } from 'react';

const RegonGenerator: FC = () => {
	const [value, setValue] = useState<string>('');
	const regonOptions = useAppSelector((state) => state.regonSlice);

	useEffect(() => {
		handleGenerateRegon();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGenerateRegon = () => {
		const result = generateRegon(regonOptions.type);
		setValue(result?.result ?? '');
	};

	return (
		<CustomBox title="REGON Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="na-generate-result">
					<TypewriterText text={value} />
				</p>
				<div className="flex gap-3">
					<div>
						<CopyButton copyValue={value} />
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateRegon}>Generate</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label="Filters">
				<RegonOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default RegonGenerator;
