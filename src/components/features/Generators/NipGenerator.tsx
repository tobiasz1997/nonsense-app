import React, { FC, useEffect, useState } from 'react';
import CustomBox from '@components/ui/CustomBox';
import Button from '@components/ui/Button';
import copy from 'copy-to-clipboard';
import { generateNip } from '@utils/generators/nipGenerator';

const NipGenerator: FC = () => {
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		handleGenerateNip();
	}, []);

	const handleGenerateNip = () => {
		const result = generateNip();
		setValue(result?.result ?? '');
	};

	const handleCopyNip = () => {
		copy(value);
	};

	return (
		<CustomBox title="NIP Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className="dark:selection: text-center text-xl font-bold text-green-dark selection:bg-green-dark selection:text-pistachio dark:text-pistachio dark:selection:bg-orange dark:selection:text-green-dark sm:text-3xl">
					{value}
				</p>
				<div className="flex gap-3">
					<div>
						<Button disabled={value.length === 0} onClick={handleCopyNip}>
							Copy
						</Button>
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateNip}>Generate</Button>
					</div>
				</div>
			</div>
		</CustomBox>
	);
};

export default NipGenerator;
