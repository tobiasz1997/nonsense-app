import PeselOptions from '@components/features/Generators/Filters/PeselOptions';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import { useAppSelector } from '@store/store';
import generatePesel from '@utils/generators/peselGenerator';
import copy from 'copy-to-clipboard';
import React, { FC, useEffect, useState } from 'react';

const PeselGenerator: FC = () => {
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

	const handleCopyPesel = () => {
		copy(value);
	};

	return (
		<CustomBox title="Pesel Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="na-generate-result">
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
