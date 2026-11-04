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
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { SCHEDULE_KEY } from '../../../const/storageKeys.const';

type Props = {
	onSubmit: (payload: IScheduleForm) => void;
};

const CURRENT_MONTH = new Date().getMonth().toString();
const CURRENT_YEAR = new Date().getFullYear().toString();

const ScheduleForm: FC<Props> = (props) => {
	const t = useTranslations();
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
			month: CURRENT_MONTH,
			year: CURRENT_YEAR
		}
	});

	const tooltipContent = (
		<div className="max-w-sm">
			<p>
				{t('schedule.descriptionHelp.firstProject', {
					projectToken: '{{ project1 }}',
					hoursToken: '{{ hours1 }}'
				})}
			</p>
			<p className="mt-2">
				{t('schedule.descriptionHelp.additionalProjects', {
					projectToken: '{{ project2 }}',
					hoursToken: '{{ hours2 }}'
				})}
			</p>
			<p className="mt-2">
				{t('schedule.descriptionHelp.totalHours', {
					totalHoursToken: '{{ totalHours }}'
				})}
			</p>
			<div className="mt-2">
				<p className="font-semibold">{t('schedule.descriptionHelp.example')}</p>
				<code className="block na-sample">
					- {'{{ project1 }}'} – {'{{ hours1 }}'}
					{t('schedule.descriptionHelp.hoursUnit')}
					<br />- {'{{ project2 }}'} – {'{{ hours2 }}'}
					{t('schedule.descriptionHelp.hoursUnit')}
					<br />
					{t('schedule.descriptionHelp.totalHoursLabel')} – {'{{ totalHours }}'}
					{t('schedule.descriptionHelp.hoursUnit')}
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
		<CustomBox title={t('schedule.formTitle')}>
			<form
				noValidate
				onSubmit={handleSubmit((data) => submit(data))}
				className="grid gap-5 grid-cols-1 sm:grid-cols-2"
			>
				<FormInput
					label={t('schedule.title')}
					tabIndex={0}
					{...register('title', {
						...validateRequired()
					})}
					placeholder={t('schedule.titlePlaceholder')}
					error={
						errors.title?.message && t(`validation.${errors.title?.message}`)
					}
				/>
				<FormInput
					label={t('schedule.author')}
					{...register('author', {
						...validateRequired()
					})}
					placeholder={t('schedule.authorPlaceholder')}
					error={
						errors.author?.message && t(`validation.${errors.author?.message}`)
					}
				/>
				<FormSelect
					label={t('schedule.month')}
					{...register('month', {
						...validateRequired()
					})}
					options={monthsList.map((month) => ({
						...month,
						label: t(`schedule.months.${month.label}`)
					}))}
				/>
				<FormSelect
					label={t('schedule.year')}
					{...register('year', {
						...validateRequired()
					})}
					options={yearsLists}
				/>
				<div className="col-span-1 sm:col-span-2">
					<ExpansionPanel label={t('schedule.extraData')}>
						<FormTextarea
							label={t('schedule.description')}
							tooltip={tooltipContent}
							{...register('descriptionTemplate')}
						/>
					</ExpansionPanel>
				</div>
				<div className="col-span-1 sm:col-span-2">
					<Button>{t('schedule.showGeneratedDates')}</Button>
				</div>
			</form>
		</CustomBox>
	);
};

export default ScheduleForm;
