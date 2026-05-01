import StringOptions from '@components/features/Generators/Filters/StringOptions';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import { useAppSelector } from '@store/store';
import { generateString } from '@utils/generators/stringGenerate';
import copy from 'copy-to-clipboard';
import React, { FC, useEffect, useState } from 'react';
import cx from "classnames";

const StringGenerator: FC = () => {
	const [value, setValue] = useState<string>('');
	const stringOptions = useAppSelector((state) => state.stringSlice);

	useEffect(() => {
		handleGenerateString();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGenerateString = () => {
		const result = generateString(stringOptions.length, stringOptions.space);
		setValue(result?.result ?? '');
	};

	const handleCopyString = () => {
		copy(value);
	};

	return (
		<CustomBox title="String Generator">
			<div className="grid gap-5 sm:grid-cols-2">
				<p className={cx('na-generate-result line-clamp-[20]', {
                    'text-xl sm:text-3xl': value.length < 500,
                    'text-lg sm:text-xl': value.length >= 500 && value.length < 1_000,
                    'text-base sm:text-lg': value.length >= 1_000 && value.length < 5_000,
                    'text-sm sm:text-base': value.length >= 5_000 && value.length < 10_000,
                    'text-xs sm:text-sm': value.length >= 10_000,
                })}>
					{value}
				</p>
				<div className="flex gap-3">
					<div>
						<Button disabled={value.length === 0} onClick={handleCopyString}>
							Copy
						</Button>
					</div>
					<div className="flex-auto">
						<Button onClick={handleGenerateString}>Generate</Button>
					</div>
				</div>
			</div>
			<ExpansionPanel label="Filters">
				<StringOptions />
			</ExpansionPanel>
		</CustomBox>
	);
};

export default StringGenerator;
