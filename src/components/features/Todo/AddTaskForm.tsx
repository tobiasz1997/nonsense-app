import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { TaskFormType } from '@interfaces/taskFormType';
import { validateRequired } from '@utils/validators';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (payload: TaskFormType) => void;
};

const AddTaskForm: FC<Props> = (props) => {
	const t = useTranslations();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TaskFormType>();

	return (
		<form className="mt-5" noValidate onSubmit={handleSubmit(props.onSubmit)}>
			<FormInput
				autoFocus
				{...register('task', { ...validateRequired() })}
				placeholder={t('tasks.taskPlaceholder')}
				error={errors.task?.message && t(`validation.${errors.task?.message}`)}
			/>
			<div className="mt-5">
				<Button>{t('tasks.sendMessage')}</Button>
			</div>
		</form>
	);
};

export default AddTaskForm;
