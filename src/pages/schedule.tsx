import {
	getUniqueProjectsAndRelatedHoursSum,
	replaceScheduleTemplate,
	replaceScheduleTemplateVariables
} from '@components/features/Schedule/replaceScheduleHelpers';
import ScheduleDatesForm from '@components/features/Schedule/ScheduleDatesForm';
import ScheduleForm from '@components/features/Schedule/ScheduleForm';
import SchedulePDF from '@components/features/Schedule/SchedulePDF';
import { workingDaysGenerator } from '@components/features/Schedule/workingDaysGenerator';
import Loader from '@components/ui/Loader';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { AppPage } from '@interfaces/appPage';
import {
	ISchedule,
	IScheduleDatesForm,
	IScheduleForm
} from '@interfaces/scheduleType';
import { PDFDownloadLink } from '@react-pdf/renderer';
import * as React from 'react';
import { useReducer } from 'react';

type scheduleActions = {
	type: 'scheduleFormSubmit' | 'scheduleDatesFormSubmit' | 'closeDownloadModal';
	payload?: IScheduleForm | IScheduleDatesForm;
};

type scheduleState = {
	workingDays: Date[];
	schedule: ISchedule | null;
	downloadModal: boolean;
};

const initialSchedule: scheduleState = {
	workingDays: [],
	schedule: null,
	downloadModal: false
};

const searchReducer = (
	state: scheduleState,
	action: scheduleActions | null
): scheduleState => {
	switch (action?.type) {
		case 'scheduleFormSubmit': {
			const payload = action.payload as IScheduleForm;
			const workingDays = workingDaysGenerator(payload.month, payload.year);
			return {
				schedule: {
					...payload,
					plans: []
				},
				workingDays,
				downloadModal: false
			};
		}
		case 'scheduleDatesFormSubmit':
			const plans = (action.payload as IScheduleDatesForm).plans;
			const uniqueProjectsAndSumHours =
				getUniqueProjectsAndRelatedHoursSum(plans);
			const projectsTemplateData = replaceScheduleTemplate(
				uniqueProjectsAndSumHours
			);
			const description = replaceScheduleTemplateVariables(
				state.schedule?.descriptionTemplate,
				projectsTemplateData
			);

			return {
				workingDays: state.workingDays,
				schedule: {
					...state.schedule!,
					description,
					plans
				},
				downloadModal: true
			};
		case 'closeDownloadModal':
			return {
				...state,
				downloadModal: false
			};
		default:
			return initialSchedule;
	}
};

const SchedulePage: AppPage = () => {
	const [scheduleState, dispatchScheduleState] = useReducer(
		searchReducer,
		initialSchedule
	);

	const generateFileName = (schedule: ISchedule): string =>
		`${schedule.title.replace(' ', '_')}_${schedule.author.replace(' ', '_')}_${+schedule.month + 1}_${schedule.year}`;

	return (
		<>
			<div className="na-p-page space-y-5">
				<h1 className="na-title">Schedule</h1>

				<ScheduleForm
					onSubmit={(payload) =>
						dispatchScheduleState({ type: 'scheduleFormSubmit', payload })
					}
				/>
				{scheduleState.workingDays.length > 0 && (
					<ScheduleDatesForm
						onSubmit={(payload) =>
							dispatchScheduleState({
								type: 'scheduleDatesFormSubmit',
								payload
							})
						}
						dates={scheduleState.workingDays}
					/>
				)}
			</div>

			{scheduleState && scheduleState.downloadModal && (
				<Modal>
					<ModalBox
						onClose={() =>
							dispatchScheduleState({ type: 'closeDownloadModal' })
						}
					>
						<div className="my-3 space-y-2 text-lg dark:text-pistachio">
							<p>
								Month:{' '}
								<span className="font-bold">
									{+scheduleState.schedule!.month + 1}
								</span>
							</p>
							<p>
								Year:{' '}
								<span className="font-bold">
									{scheduleState.schedule!.year}
								</span>
							</p>
							<p>
								Total Days:{' '}
								<span className="font-bold">
									{scheduleState.schedule!.plans.length}
								</span>
							</p>
							<p>
								Total hours:{' '}
								<span className="font-bold">
									{scheduleState.schedule!.plans.reduce(
										(sum, current) => sum + +current.hours,
										0
									)}
								</span>
							</p>
							{scheduleState.schedule!.description && (
								<div>
									Description:{' '}
									<p className="font-bold whitespace-pre-wrap line-clamp-3">
										{scheduleState.schedule!.description}
									</p>
								</div>
							)}
						</div>

						<div className="text-center">
							<PDFDownloadLink
								document={<SchedulePDF data={scheduleState.schedule!} />}
								fileName={generateFileName(scheduleState.schedule!)}
								title="Download"
							>
								{({ loading }) =>
									loading ? (
										<Loader />
									) : (
										// TODO: link button reusable component
										<div className="p-3 h-12 rounded text-yellow bg-green-dark hover:bg-green-dark/[0.7] hover:shadow-xl focus:ring-green font-bold">
											Download PDF
										</div>
									)
								}
							</PDFDownloadLink>
						</div>
					</ModalBox>
				</Modal>
			)}
		</>
	);
};

SchedulePage.layoutType = 'full';
export default SchedulePage;
