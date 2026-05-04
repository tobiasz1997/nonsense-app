import { IScheduleDay } from '@interfaces/scheduleType';

type TemplateValuesType = Record<string, string | number>;

export const replaceScheduleTemplateVariables = (
	content: string | undefined,
	values: TemplateValuesType
): string => {
	if (!content) {
		return '';
	}
	return content.replace(/\{\{\s*([\w.-]+)\s*}}/g, (match, key) => {
		const value = values[key];
		return value ? String(value) : match;
	});
};

type UniqueProjectsAndHoursType = Record<string, number>;

export const getUniqueProjectsAndRelatedHoursSum = (plans: IScheduleDay[]) => {
	return plans.reduce<UniqueProjectsAndHoursType>((prev, curr) => {
		prev[curr.project] = Number((prev[curr.project] ?? 0) + +curr.hours);

		return prev;
	}, {});
};

type UniqueProjectsAndHoursForTemplateType = Record<string, string | number>;

export const replaceScheduleTemplate = (data: UniqueProjectsAndHoursType) => {
	return Object.entries(data).reduce<UniqueProjectsAndHoursForTemplateType>(
		(acc, [project, hours], index) => {
			const position = index + 1;

			acc[`project${position}`] = project;
			acc[`hours${position}`] = hours;

			return acc;
		},
		{}
	);
};
