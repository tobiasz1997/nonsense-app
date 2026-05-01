import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { validateInputWithNumbers } from '@utils/validators';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (payload: number) => void;
	submitButtonLabel?: string;
	invalidParentData?: boolean;
};

const InputNumberForm: FC<Props> = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<{ value: number }>({
		reValidateMode: 'onSubmit'
	});

	return (
		<form
			className="flex space-x-4"
			noValidate
			onSubmit={handleSubmit((payload) => props.onSubmit(payload.value))}
		>
			<fieldset className="flex-1">
				<FormInput
					{...register('value', validateInputWithNumbers())}
					placeholder={'2'}
					error={errors.value?.message}
				/>
			</fieldset>
			<div>
				<Button
					disabled={
						Boolean(props.invalidParentData) ? props.invalidParentData : false
					}
				>
					{props.submitButtonLabel ?? 'Submit'}
				</Button>
			</div>
		</form>
	);
};

export default InputNumberForm;
