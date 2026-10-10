import { ISchedule } from '@interfaces/scheduleType';

export const generateFileName = (schedule: ISchedule): string =>
	`${schedule.title.replace(' ', '_')}_${schedule.author.replace(' ', '_')}_${+schedule.month + 1}_${schedule.year}`;
