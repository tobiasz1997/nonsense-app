import OptionTitle from '@components/features/Generators/Filters/OptionTitle';
import FormCheckbox from '@components/ui/FormCheckbox';
import { setNipDivider } from '@store/slices/generators/nip.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FC } from 'react';

const NipOptions: FC = () => {
	const t = useTranslations();

	const isDivider = useAppSelector((state) => state.nipSlice.divider);
	const dispatch = useAppDispatch();

	const handleDividerChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(setNipDivider(event.target.value === 'true'));
	};

	return (
		<div className="flex flex-col space-y-4">
			<OptionTitle title={t('generators.divider')} />
			<FormCheckbox
				checked={isDivider === true}
				value="true"
				label={t('common.yes')}
				type="radio"
				onChange={handleDividerChange}
			/>
			<FormCheckbox
				checked={isDivider === false}
				value="false"
				label={t('common.no')}
				type="radio"
				onChange={handleDividerChange}
			/>
		</div>
	);
};

export default NipOptions;
