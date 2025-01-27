import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import FormCheckbox from '@components/ui/FormCheckbox';
import FormInput from '@components/ui/FormInput';
import { IScheduleDatesForm, IScheduleDay } from '@interfaces/scheduleType';
import { validateInputWithNumbers, validateRequired } from '@utils/validators';

type Props = {
	dates: Date[];
	onSubmit: (payload: IScheduleDatesForm) => void;
};

const ScheduleDatesForm: FC<Props> = (props) => {
	const {
		register,
		handleSubmit,
		control,
		getValues,
		setValue,
		formState: { errors }
	} = useForm<IScheduleDatesForm>({
		reValidateMode: 'onChange',
		defaultValues: {
			plans: props.dates.map(
				(x) =>
					({
						day: x.getDate(),
						project: '',
						hours: '',
						comment: ''
					}) as IScheduleDay
			)
		}
	});
	const { fields, remove } = useFieldArray({
		control,
		name: 'plans'
	});
	const [isReplicate, setIsReplicate] = useState(false);

	useEffect(() => {
		setValue(
			'plans',
			props.dates.map(
				(x) =>
					({
						day: x.getDate(),
						project: '',
						hours: '',
						comment: ''
					}) as IScheduleDay
			)
		);
	}, [props.dates, setValue]);

	const handleProjectChange = (
		event: ChangeEvent<HTMLInputElement>,
		idx: number,
		prop: 'project' | 'hours' | 'comment'
	) => {
		if (isReplicate) {
			getValues().plans.forEach((_, i) => {
				if (i === idx) {
					return;
				}
				setValue(`plans.${i}.${prop}`, event.target.value);
			});
		}
	};

	return (
		<CustomBox title="Schedule Form">
			<div className="flex">
				<FormCheckbox
					label="Replicate"
					checked={isReplicate}
					onChange={() => setIsReplicate((prevState) => !prevState)}
				/>
			</div>
			<form noValidate onSubmit={handleSubmit(props.onSubmit)}>
				<table className="w-full rounded-xl border-2 border-orange">
					<thead className="hidden md:table-header-group">
						<tr className="w-full border-b border-orange text-left font-bold text-green-dark dark:text-pistachio">
							<th className="p-3">Index</th>
							<th className="p-3">Day</th>
							<th className="p-3">Project</th>
							<th className="p-3">Hours</th>
							<th className="p-3">Comment</th>
							<th className="p-3">Actions</th>
						</tr>
					</thead>
					<tbody>
						{fields.map((item, idx) => (
							<tr
								key={item.id}
								className="grid border-b border-orange sm:grid-cols-2 md:table-row"
							>
								<td className="p-1 md:p-3 text-lg text-zinc-800 dark:text-pistachio">
									{idx + 1}
								</td>
								<td className="p-1 md:p-3">
									<div className="text-xl font-bold text-zinc-800 dark:text-pistachio">
										{item.day}
									</div>
								</td>
								<td className="p-1 md:p-3">
									<FormInput
										{...register(`plans.${idx}.project`, {
											...validateRequired(),
											onChange: (x) => handleProjectChange(x, idx, 'project')
										})}
										error={errors.plans?.[idx]?.project?.message}
										dimension="small"
										placeholder="Project"
									/>
								</td>
								<td className="p-1 md:p-3">
									<FormInput
										{...register(`plans.${idx}.hours`, {
											...validateInputWithNumbers(),
											onChange: (x) => handleProjectChange(x, idx, 'hours')
										})}
										error={errors.plans?.[idx]?.hours?.message}
										dimension="small"
										placeholder="Hours"
									/>
								</td>
								<td className="p-1 md:p-3">
									<FormInput
										{...register(`plans.${idx}.comment`, {
											onChange: (x) => handleProjectChange(x, idx, 'comment')
										})}
										dimension="small"
										placeholder="Comment"
									/>
								</td>
								<td className="p-1 md:p-3">
									<Button
										onClick={() => remove(idx)}
										className="max-w-max"
										size="small"
										variant="delete"
										icon={<XMarkIcon />}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="mt-5">
					<Button type="submit">Generate report</Button>
				</div>
			</form>
		</CustomBox>
	);
};

export default ScheduleDatesForm;
