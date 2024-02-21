import { ChangeEvent, FC } from 'react';
import FormCheckbox from '@components/ui/FormCheckbox';
import { useAppDispatch, useAppSelector } from '@store/store';
import { changeRegonType } from '@store/generators/regon.slice';
import { regonType } from '@utils/generators/regonGenerator';
import OptionTitle from '@components/features/Generators/Filters/OptionTitle';

const RegonOptions: FC = () => {
	const regonType = useAppSelector((state) => state.regonSlice.type);
	const dispatch = useAppDispatch();

	const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeRegonType(event.target.value as regonType));
	};

	return (
		<div className="flex flex-col space-y-4">
			<OptionTitle title="Long" />
			<FormCheckbox
				checked={regonType === 'short'}
				value="short"
				label="7 digits"
				type="radio"
				onChange={handleTypeChange}
			/>
			<FormCheckbox
				checked={regonType === 'long'}
				value="long"
				label="9 digits"
				type="radio"
				onChange={handleTypeChange}
			/>
		</div>
	);
};

export default RegonOptions;
