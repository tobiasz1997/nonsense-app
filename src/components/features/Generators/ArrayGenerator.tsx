import ArrayOptions from '@components/features/Generators/Filters/ArrayOptions';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import { useAppSelector } from '@store/store';
import generateArray from '@utils/generators/arrayGenerator';
import copy from 'copy-to-clipboard';
import React, { FC, useEffect, useState } from 'react';

const ArrayGenerator: FC = () => {
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

	const handleCopyNip = () => {
		copy(value);
	};

	return (
		<CustomBox title="Array Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="dark:selection:text-center wrap-break-word text-xl font-bold text-green-dark selection:bg-green-dark selection:text-pistachio dark:text-pistachio dark:selection:bg-orange dark:selection:text-green-dark sm:text-3xl">
					{value}
				</p>
				<div className="flex gap-3">
					<div>
						<Button disabled={value.length === 0} onClick={handleCopyNip}>
							Copy
						</Button>
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateArray}>Generate</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label="Filters">
				<ArrayOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default ArrayGenerator;
