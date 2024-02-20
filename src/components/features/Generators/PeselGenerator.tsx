import React, { FC, useEffect, useState } from 'react';
import CustomBox from '@components/ui/CustomBox';
import Button from '@components/ui/Button';
import copy from 'copy-to-clipboard';
import generatePesel from '@utils/generators/peselGenerator';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import PeselOptions from '@components/features/Generators/PeselOptions';
import { useAppSelector } from '@store/store';

const PeselGenerator: FC = () => {
	const [value, setValue] = useState<string>('');
	const peselOptions = useAppSelector((state) => state.peselSlice);

	useEffect(() => {
		handleGeneratePesel();
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

	const handleCopyPesel = () => {
		copy(value);
	};

	return (
		<CustomBox title="Pesel Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="text-center text-xl font-bold text-green-dark selection:bg-green-dark selection:text-pistachio dark:text-pistachio dark:selection:bg-orange dark:selection:text-green-dark sm:text-3xl">
					{value}
				</p>
				<div className="flex gap-3">
					<div>
						<Button disabled={value.length === 0} onClick={handleCopyPesel}>
							Copy
						</Button>
					</div>
					<div className="flex-auto">
						<Button onClick={handleGeneratePesel}>Generate</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label="Filters">
				<PeselOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default PeselGenerator;
