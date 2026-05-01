import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import FormInput from '@components/ui/FormInput';
import {
	setStringLength,
	setStringSpace
} from '@store/generators/string.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { ChangeEvent, FC, useState } from 'react';

const StringOptions: FC = () => {
	const length = useAppSelector((state) => state.stringSlice.length);
	const space = useAppSelector((state) => state.stringSlice.space);
	const dispatch = useAppDispatch();

	const [lengthError, setLengthError] = useState<string>('');

	const handleLengthValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value === '' || value === undefined) {
			setLengthError('Value is required.');
			return;
		}
		const numberValue = Number(value);
		if (isNaN(numberValue)) {
			setLengthError('Value must be a number.');
			return;
		} else if (numberValue <= 0) {
			setLengthError('Value must be grater than 0.');
			return;
		} else {
			setLengthError('');
			dispatch(setStringLength(numberValue));
		}
	};

	const handleSpaceChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setStringSpace(event.target.value === 'true'));
	};

	return (
		<section className="grid grid-cols-1 gap-4 sm:grid-cols-4">
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Lenght" />
				<FormInput
					type="number"
					defaultValue={length}
					error={lengthError}
					onChange={handleLengthValueChange}
				/>
			</div>
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Space" />
				<FormCheckbox
					checked={space === true}
					value="true"
					label="Yes"
					type="radio"
					onChange={handleSpaceChange}
				/>
				<FormCheckbox
					checked={space === false}
					value="false"
					label="No"
					type="radio"
					onChange={handleSpaceChange}
				/>
			</div>
		</section>
	);
};

export default StringOptions;
