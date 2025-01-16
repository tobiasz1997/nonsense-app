import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import useLocalStorage from '@hooks/useLocalStorage';
import { IScheduleForm } from '@interfaces/scheduleType';
import { monthsList } from '@utils/lists/months-list';
import { yearsLists } from '@utils/lists/years-lists';
import { validateRequired } from '@utils/validators';

type Props = {
	onSubmit: (payload: IScheduleForm) => void;
};

const ScheduleForm: FC<Props> = (props) => {
	const { set, get } = useLocalStorage();
	const SCHEDULE_AUTHOR = 'schedule_author';
	const SCHEDULE_TITLE = 'schedule_title';

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IScheduleForm>({
		reValidateMode: 'onSubmit',
		defaultValues: {
			author: get(SCHEDULE_AUTHOR) ?? '',
			title: get(SCHEDULE_TITLE) ?? '',
			month: new Date().getMonth().toString(),
			year: new Date().getFullYear().toString()
		}
	});

	const submit = (payload: IScheduleForm) => {
		set(SCHEDULE_AUTHOR, payload.author);
		set(SCHEDULE_TITLE, payload.title);
		props.onSubmit(payload);
	};

	return (
		<CustomBox title="Schedule Form">
			<form
				noValidate
				onSubmit={handleSubmit((data) => submit(data))}
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
