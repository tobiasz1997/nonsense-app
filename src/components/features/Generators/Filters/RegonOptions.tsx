import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import { changeRegonType } from '@store/slices/generators/regon.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { regonType } from '@utils/generators/regonGenerator';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FC } from 'react';

const RegonOptions: FC = () => {
	const t = useTranslations('generators');
	const regonType = useAppSelector((state) => state.regonSlice.type);
	const dispatch = useAppDispatch();

	const handleTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeRegonType(event.target.value as regonType));
	};

	return (
		<div className="flex flex-col space-y-4">
			<OptionTitle title={t('regonLength')} />
			<FormCheckbox
				checked={regonType === 'short'}
				value="short"
				label={t('sevenDigits')}
				type="radio"
				onChange={handleTypeChange}
			/>
			<FormCheckbox
				checked={regonType === 'long'}
				value="long"
				label={t('nineDigits')}
				type="radio"
				onChange={handleTypeChange}
			/>
		</div>
	);
};

export default RegonOptions;
