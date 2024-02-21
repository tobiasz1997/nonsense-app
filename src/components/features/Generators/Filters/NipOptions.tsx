import { ChangeEvent, FC } from 'react';
import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import { setNipDivider } from '@store/generators/nip.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

const NipOptions: FC = () => {
	const isDivider = useAppSelector((state) => state.nipSlice.divider);
	const dispatch = useAppDispatch();

	const handleDividerChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setNipDivider(event.target.value === 'true'));
	};

	return (
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
	);
};

export default NipOptions;
