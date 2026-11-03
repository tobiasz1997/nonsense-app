import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { validateInputWithStringOfNumbersAndSeparator } from '@utils/validators';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	initialValue: number[];
	onSubmit: (payload: number[]) => void;
};

const ArrayOfNumbersForm: FC<Props> = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{ value: string }>({
		defaultValues: {
			value: props.initialValue.join(';')
		},
		reValidateMode: 'onSubmit'
	});
	const t = useTranslations();

	return (
		<form
			className="flex space-x-4"
			noValidate
			onSubmit={handleSubmit((payload) =>
				props.onSubmit(payload.value.split(';').map(Number))
			)}
		>
			<fieldset className="flex-1">
				<FormInput
					{...register('value', validateInputWithStringOfNumbersAndSeparator())}
					placeholder={'2;44;21'}
					error={
						errors.value?.message && t('validation.' + errors.value.message)
					}
				/>
			</fieldset>
			<div>
				<Button>{t('common.add')}</Button>
			</div>
		</form>
	);
};

export default ArrayOfNumbersForm;
