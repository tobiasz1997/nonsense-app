import { ChangeEvent, FC } from 'react';
import FormCheckbox from '@components/ui/FormCheckbox';
import { useAppDispatch, useAppSelector } from '@store/store';
import { changeType } from '@store/generators/regon.slice';
import { regonType } from '@utils/generators/regonGenerator';

const RegonOptions: FC = () => {
	const regonType = useAppSelector((state) => state.regonSlice.type);
	const dispatch = useAppDispatch();

	const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeType(event.target.value as regonType));
	};

	return (
		<form className="flex flex-col space-y-4" noValidate>
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
		</form>
	);
};

export default RegonOptions;
