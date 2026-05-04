import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import FormTextarea from '@components/ui/FormTextarea';
import useLocalStorage from '@hooks/useLocalStorage';
import { IScheduleForm } from '@interfaces/scheduleType';
import { monthsList } from '@utils/lists/months-list';
import { yearsLists } from '@utils/lists/years-lists';
import { validateRequired } from '@utils/validators';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
	onSubmit: (payload: IScheduleForm) => void;
};

const ScheduleForm: FC<Props> = (props) => {
	const { set, get } = useLocalStorage();
	const SCHEDULE_AUTHOR = 'schedule_author';
	const SCHEDULE_TITLE = 'schedule_title';
	const SCHEDULE_DESCRIPTION_TEMPLATE = 'schedule_description';

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IScheduleForm>({
		reValidateMode: 'onSubmit',
		defaultValues: {
			author: get(SCHEDULE_AUTHOR) ?? '',
			title: get(SCHEDULE_TITLE) ?? '',
			descriptionTemplate: get(SCHEDULE_DESCRIPTION_TEMPLATE) ?? '',
			month: new Date().getMonth().toString(),
			year: new Date().getFullYear().toString()
		}
	});

	const submit = (payload: IScheduleForm) => {
		set(SCHEDULE_AUTHOR, payload.author);
		set(SCHEDULE_TITLE, payload.title);
		set(SCHEDULE_DESCRIPTION_TEMPLATE, payload.descriptionTemplate ?? '');
		props.onSubmit(payload);
	};

	return (
		<CustomBox title="Schedule Form">
			<form
				noValidate
				onSubmit={handleSubmit((data) => submit(data))}
				className="grid gap-5 grid-cols-1 sm:grid-cols-2"
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
				<div className="col-span-2">
					<ExpansionPanel label="Extra data">
						<FormTextarea
							label="Description"
							{...register('descriptionTemplate')}
						/>
					</ExpansionPanel>
				</div>
				<div className="mt-5 col-span-1 sm:col-span-2">
					<Button>Show generated dates</Button>
				</div>
			</form>
		</CustomBox>
	);
};

export default ScheduleForm;
