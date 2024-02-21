import React, { FC, useEffect, useState } from 'react';
import CustomBox from '@components/ui/CustomBox';
import Button from '@components/ui/Button';
import copy from 'copy-to-clipboard';
import generateRegon from '@utils/generators/regonGenerator';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import RegonOptions from '@components/features/Generators/Filters/RegonOptions';
import { useAppSelector } from '@store/store';

const RegonGenerator: FC = () => {
	const [value, setValue] = useState<string>('');
	const regonOptions = useAppSelector((state) => state.regonSlice);

	useEffect(() => {
		handleGenerateRegon();
	}, []);

	const handleGenerateRegon = () => {
		const result = generateRegon(regonOptions.type);
		setValue(result?.result ?? '');
	};

	const handleCopyRegon = () => {
		copy(value);
	};

	return (
		<CustomBox title="REGON Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="text-center text-xl font-bold text-green-dark selection:bg-green-dark selection:text-pistachio dark:text-pistachio dark:selection:bg-orange dark:selection:text-green-dark sm:text-3xl">
					{value}
				</p>
				<div className="flex gap-3">
					<div>
						<Button disabled={value.length === 0} onClick={handleCopyRegon}>
							Copy
						</Button>
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
