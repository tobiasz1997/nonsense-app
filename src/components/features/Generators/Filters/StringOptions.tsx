import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import FormInput from '@components/ui/FormInput';
import {
	setStringLength,
	setStringSpace
} from '@store/slices/generators/string.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FC, useState } from 'react';

const StringOptions: FC = () => {
	const t = useTranslations();
	const length = useAppSelector((state) => state.stringSlice.length);
	const space = useAppSelector((state) => state.stringSlice.space);
	const dispatch = useAppDispatch();

	const [lengthError, setLengthError] = useState<string>('');

	const handleLengthValueChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value === '' || value === undefined) {
			setLengthError('valueRequired');
			return;
		}
		const numberValue = Number(value);
		if (isNaN(numberValue)) {
			setLengthError('mustBeNumber');
			return;
		} else if (numberValue <= 0) {
			setLengthError('mustBePositive');
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
				<OptionTitle title={t('generators.length')} />
				<FormInput
					type="number"
					defaultValue={length}
					error={lengthError ? t(`validation.${lengthError}`) : undefined}
					onChange={handleLengthValueChange}
				/>
			</div>
			<div className="flex flex-col space-y-4">
				<OptionTitle title={t('generators.space')} />
				<FormCheckbox
					checked={space === true}
					value="true"
					label={t('common.yes')}
					type="radio"
					onChange={handleSpaceChange}
				/>
				<FormCheckbox
					checked={space === false}
					value="false"
					label={t('common.no')}
					type="radio"
					onChange={handleSpaceChange}
				/>
			</div>
		</section>
	);
};

export default StringOptions;
