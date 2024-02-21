import { ChangeEvent, FC } from 'react';
import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import {
	changePeselGender,
	changePeselMaxYear,
	changePeselMinYear,
	setPeselDivider
} from '@store/generators/pesel.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { genderType } from '@utils/generators/peselGenerator';

const PeselOptions: FC = () => {
	const minYear = useAppSelector((state) => state.peselSlice.minYear);
	const maxYear = useAppSelector((state) => state.peselSlice.maxYear);
	const gender = useAppSelector((state) => state.peselSlice.gender);
	const isDivider = useAppSelector((state) => state.peselSlice.divider);
	const dispatch = useAppDispatch();

	const currentYear = new Date().getFullYear();
	const availableYears: number[] = [
		1900,
		1920,
		1940,
		1980,
		2000,
		2010,
		currentYear
	];

	const handleMinYearChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changePeselMinYear(Number(event.target.value)));
	};

	const handleMaxYearChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changePeselMaxYear(Number(event.target.value)));
	};

	const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.target.checked
			? dispatch(changePeselGender(event.target.value as genderType))
			: dispatch(changePeselGender(null));
	};

	const handleDividerChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setPeselDivider(event.target.value === 'true'));
	};

	return (
		<section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Min Year" />
				{availableYears.map((year) => (
					<FormCheckbox
						key={year}
						checked={minYear === year}
						disabled={maxYear < year}
						value={year}
						label={year === currentYear ? 'Current' : year.toString()}
						type="radio"
						onChange={handleMinYearChange}
					/>
				))}
			</div>
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Max Year" />
				{availableYears.map((year) => (
					<FormCheckbox
						key={year}
						checked={maxYear === year}
						disabled={minYear > year}
						value={year}
						label={year === currentYear ? 'Current' : year.toString()}
						type="radio"
						onChange={handleMaxYearChange}
					/>
				))}
			</div>
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Gender" />
				<FormCheckbox
					checked={gender === 'male'}
					value="male"
					label="Male"
					onChange={handleGenderChange}
				/>
				<FormCheckbox
					checked={gender === 'female'}
					value="female"
					label="Female"
					onChange={handleGenderChange}
				/>
			</div>
			<div className="flex flex-col space-y-4">
				<OptionTitle title="Divider" />
				<FormCheckbox
					checked={isDivider === true}
					value="true"
					label="Yes"
					type="radio"
					onChange={handleDividerChange}
				/>
				<FormCheckbox
					checked={isDivider === false}
					value="false"
					label="No"
					type="radio"
					onChange={handleDividerChange}
				/>
			</div>
		</section>
	);
};

export default PeselOptions;
