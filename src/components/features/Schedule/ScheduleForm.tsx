import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import FormInput from '@components/ui/FormInput';
import FormSelect from '@components/ui/FormSelect';
import FormTextarea from '@components/ui/FormTextarea';
import { IScheduleForm, IScheduleStorage } from '@interfaces/scheduleType';
import { monthsList } from '@utils/lists/months-list';
import { yearsLists } from '@utils/lists/years-lists';
import { localStorageGet, localStorageSet } from '@utils/localStorage';
import { validateRequired } from '@utils/validators';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SCHEDULE_KEY } from '../../../const/storageKeys.const';

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
			author:
				localStorageGet<IScheduleStorage | null>(SCHEDULE_KEY)?.author ?? '',
			title:
				localStorageGet<IScheduleStorage | null>(SCHEDULE_KEY)?.title ?? '',
			descriptionTemplate:
				localStorageGet<IScheduleStorage | null>(SCHEDULE_KEY)
					?.descriptionTemplate ?? '',
			month: new Date().getMonth().toString(),
			year: new Date().getFullYear().toString()
		}
	});

	const tooltipContent = (
		<div className="max-w-sm">
			<p>
				Use <code className="na-sample">{'{{ project1 }}'}</code> and{' '}
				<code className="na-sample">{'{{ hours1 }}'}</code> in the description
				to automatically insert the first project's name and its total hours.
			</p>

			<p className="mt-2">
				For additional projects, use{' '}
				<code className="na-sample">{'{{ project2 }}'}</code> and{' '}
				<code className="na-sample">{'{{ hours2 }}'}</code>, and so on. You can
				add as many projects as needed.
			</p>

			<p className="mt-2">
				Use <code className="na-sample">{'{{ totalHours }}'}</code> to display
				the sum of hours across all projects.
			</p>

			<div className="mt-2">
				<p className="font-semibold">Example:</p>
				<code className="block na-sample">
					- {'{{ project1 }}'} – {'{{ hours1 }}'}h
					<br />- {'{{ project2 }}'} – {'{{ hours2 }}'}h
					<br />
					Total hours – {'{{ totalHours }}'}h
				</code>
			</div>
		</div>
	);

	const submit = (payload: IScheduleForm) => {
		localStorageSet<IScheduleStorage>(SCHEDULE_KEY, {
			author: payload.author,
			title: payload.title,
			descriptionTemplate: payload.descriptionTemplate ?? ''
		});
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
				<div className="col-span-1 sm:col-span-2">
					<ExpansionPanel label="Extra data">
						<FormTextarea
							label="Description"
							tooltip={tooltipContent}
							{...register('descriptionTemplate')}
						/>
					</ExpansionPanel>
				</div>
				<div className="col-span-1 sm:col-span-2">
					<Button>Show generated dates</Button>
				</div>
			</form>
		</CustomBox>
	);
};

export default ScheduleForm;
