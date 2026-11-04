import {
	getUniqueProjectsAndRelatedHoursSum,
	replaceScheduleTemplate,
	replaceScheduleTemplateVariables
} from '@components/features/Schedule/replaceScheduleHelpers';
import { IScheduleDay } from '@interfaces/scheduleType';

describe('Replace Schedule Helpers', () => {
	describe('replaceScheduleTemplateVariables', () => {
		test('Should return empty string then no content', () => {
			const result = replaceScheduleTemplateVariables('', {});

			expect(result).toEqual('');
		});

		test('Should return correct string based on template', () => {
			const template =
				'{{ name1 }} and {{ name2 }} are {{ ageSum }} years old together.';
			const values = { name1: 'Ciri', name2: 'Panam', ageSum: '40' };
			const result = replaceScheduleTemplateVariables(template, values);

			expect(result).toEqual('Ciri and Panam are 40 years old together.');
		});
	});

	test('getUniqueProjectsAndRelatedHoursSum should return correct object with projects and hours sum', () => {
		const data: IScheduleDay[] = [
			{
				comment: '',
				day: 1,
				project: 'A',
				hours: '6'
			},
			{
				comment: '',
				day: 1,
				project: 'B',
				hours: '22'
			},
			{
				comment: '',
				day: 1,
				project: 'A',
				hours: '5'
			}
		];
		const result = getUniqueProjectsAndRelatedHoursSum(data);

		expect(result).toEqual({ A: 11, B: 22 });
	});

	test('replaceScheduleTemplate should return correct object with projects and hours for template replacer', () => {
		const data = { A: 11, B: 22 };
		const result = replaceScheduleTemplate(data);

		expect(result).toEqual({
			hours1: 11,
			hours2: 22,
			project1: 'A',
			project2: 'B'
		});
	});
});
