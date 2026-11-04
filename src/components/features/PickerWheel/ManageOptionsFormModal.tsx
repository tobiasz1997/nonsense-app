import Button from '@components/ui/Button';
import FormTextarea from '@components/ui/FormTextarea';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { WheelOption } from '@interfaces/wheelOption';
import {
	addOptions,
	clearOptionsAndCloseModal,
	closeManageOptionsFormModal
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch } from '@store/store';
import { validateRequired } from '@utils/validators';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	options: WheelOption[];
};

const ManageOptionsFormModal: FC<Props> = (props) => {
	const t = useTranslations();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{ options: string }>({
		reValidateMode: 'onSubmit',
		defaultValues: {
			options: props.options?.map((x) => x.name).join('\n') ?? []
		}
	});

	const submit = (value: any) => {
		const options = value.split(/[\n;]/).filter(Boolean);

		dispatch(addOptions(options));
	};

	return (
		<Modal>
			<ModalBox onClose={() => dispatch(closeManageOptionsFormModal())}>
				<h2 className="text-xl font-bold text-orange md:text-3xl">
					{t('pickerWheel.options')}
				</h2>
				<p className="text-green-dark dark:text-yellow mt-3 mb-5">
					{t('pickerWheel.optionsInstructions')}
				</p>
				<p className="text-green-dark dark:text-yellow mt-3 mb-5">
					{t('pickerWheel.resetSettingsWarning')}
				</p>
				<form
					noValidate
					onSubmit={handleSubmit((data) => submit(data.options))}
				>
					<FormTextarea
						label={t('pickerWheel.options')}
						tabIndex={0}
						rows={3}
						{...register('options', {
							...validateRequired()
						})}
						placeholder={t('pickerWheel.optionsPlaceholder')}
						error={
							errors.options?.message &&
							t(`validation.${errors.options?.message}`)
						}
					/>
					<div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
						<Button className="sm:max-w-max" type="submit">
							{t('common.save')}
						</Button>
						<Button
							className="sm:max-w-max"
							onClick={() => dispatch(clearOptionsAndCloseModal())}
						>
							{t('common.clear')}
						</Button>
					</div>
				</form>
			</ModalBox>
		</Modal>
	);
};

export default ManageOptionsFormModal;
