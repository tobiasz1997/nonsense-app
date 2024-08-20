import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import { monthsList } from '@utils/lists/months-list';
import { yearsLists } from '@utils/lists/years-lists';
import { validateRequired } from '@utils/validators';

export interface IScheduleForm {
	title: string;
	author: string;
	month: string;
	year: string;
}

type Props = {
	onSubmit: (payload: IScheduleForm) => void;
};

const ScheduleForm: FC<Props> = (props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IScheduleForm>({
		reValidateMode: 'onSubmit',
		defaultValues: {
			author: 'Jan Kolwalski',
			title: 'Amazing title',
			month: new Date().getMonth().toString(),
			year: new Date().getFullYear().toString()
		}
	});

	return (
		<CustomBox title="Schedule Form">
			<form
				noValidate
				onSubmit={handleSubmit(props.onSubmit)}
				className="grid gap-5 sm:grid-cols-2"
			>
				<FormInput
					label="Title"
					tabIndex={0}
					{...register('title', {
						...validateRequired()
					})}
					placeholder={'Type title'}
					error={errors.title?.message}
				/>
				<FormInput
					label="Author"
					{...register('author', {
						...validateRequired()
					})}
					placeholder={'Type author'}
					error={errors.author?.message}
				/>
				<FormSelect
					label="Month"
					{...register('month', {
						...validateRequired()
					})}
					options={monthsList}
				/>
				<FormSelect
					label="Year"
					{...register('year', {
						...validateRequired()
					})}
					options={yearsLists}
				/>
				<div className="mt-5 col-span-1 sm:col-span-2">
					<Button>Show generated dates</Button>
				</div>
			</form>
		</CustomBox>
	);
};

export default ScheduleForm;
