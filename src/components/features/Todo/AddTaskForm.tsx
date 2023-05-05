import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { TaskFormType } from '@interfaces/taskFormType';
import FormInput from '@components/ui/FormInput';
import { validateRequired } from '@utils/validators';
import Button from '@components/ui/Button';

type Props = {
	onSubmit: (payload: TaskFormType) => void;
};

const AddTaskForm: FC<Props> = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TaskFormType>();

	return (
		<form className="mt-5" noValidate onSubmit={handleSubmit(props.onSubmit)}>
			<FormInput
				{...register('task', {
					...validateRequired()
				})}
				placeholder={'Go to shop'}
				error={errors.task?.message}
			/>
			<div className="mt-5">
				<Button>Send message</Button>
			</div>
		</form>
	);
};

export default AddTaskForm;
