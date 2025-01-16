export interface ISchedule {
	title: string;
	author: string;
	month: string;
	year: string;
	plans: IScheduleDay[];
}

export interface IScheduleDay {
	day: number;
	project: string;
	hours: string;
	comment: string;
}

export interface IScheduleDatesForm extends Pick<ISchedule, 'plans'> {}

export interface IScheduleForm extends Omit<ISchedule, 'plans'> {}
