import StarRating from '@components/features/PickerWheel/StarRating';
import Button from '@components/ui/Button';
import FormCheckbox from '@components/ui/FormCheckbox';
import FormInput from '@components/ui/FormInput';
import FormInputColor from '@components/ui/FormInputColor';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import useGenerator from '@hooks/useGenerator';
import { WheelOption } from '@interfaces/wheelOption';
import {
	addOption,
	closeManageOptionFormModal,
	editOption
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch } from '@store/store';
import { colorList } from '@utils/lists/color-list';
import { validateRequired } from '@utils/validators';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Props = {
	option: WheelOption | null;
};

const ManageOptionFormModal: FC<Props> = ({ option }) => {
	const t = useTranslations();
	const dispatch = useAppDispatch();
	const { generateRandomNumber } = useGenerator();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<WheelOption>({
		reValidateMode: 'onSubmit',
		defaultValues: {
			id: option?.id ?? '',
			name: option?.name ?? '',
			stars: option?.stars ?? 0,
			color:
				option?.color ?? colorList[generateRandomNumber() % colorList.length],
			active: option?.active ?? true
		}
	});

	const submit = (value: WheelOption) => {
		if (option !== null) {
			dispatch(editOption(value));
		} else {
			dispatch(addOption(value));
		}
	};

	return (
		<Modal>
			<ModalBox onClose={() => dispatch(closeManageOptionFormModal())}>
				<h2 className="text-xl font-bold text-orange md:text-3xl mb-4">
					{t(
						option === null ? 'pickerWheel.addOption' : 'pickerWheel.editOption'
					)}
				</h2>
				<form
					noValidate
					onSubmit={handleSubmit((data: WheelOption) => submit(data))}
					className="flex flex-col gap-4"
				>
					<FormInput
						label={t('pickerWheel.name')}
						tabIndex={0}
						{...register('name', {
							...validateRequired<WheelOption, 'name'>()
						})}
						error={
							errors.name?.message && t(`validation.${errors.name?.message}`)
						}
					/>
					<FormInputColor
						{...register('color', {
							...validateRequired<WheelOption, 'color'>()
						})}
						error={
							errors.color?.message && t(`validation.${errors.color?.message}`)
						}
					/>
					<Controller
						control={control}
						name="stars"
						render={({ field: { onChange, value } }) => (
							<StarRating
								value={value ?? 0}
								onChange={(star) => onChange(star)}
							/>
						)}
					/>
					<FormCheckbox
						label={t('pickerWheel.active')}
						{...register('active')}
						error={
							errors.color?.message && t(`validation.${errors.color?.message}`)
						}
					/>
					<div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
						<Button className="sm:max-w-max" type="submit">
							{t(option === null ? 'common.add' : 'common.edit')}
						</Button>
						<Button
							className="sm:max-w-max"
							onClick={() => dispatch(closeManageOptionFormModal())}
						>
							{t('common.close')}
						</Button>
					</div>
				</form>
			</ModalBox>
		</Modal>
	);
};

export default ManageOptionFormModal;
