import { workingDaysGenerator } from '@components/features/Schedule/workingDaysGenerator';

describe('Working Days Generator', () => {
	describe('Should generate correct working days for specific month and year', () => {
		it.each([
			{
				month: 1,
				year: 2031,
				days: [
					3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27,
					28
				]
			},
			{
				month: 8,
				year: 2044,
				days: [
					1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 26, 27,
					28, 29, 30
				]
			}
		])(
			'should generate correct working days in $month / $year',
			({ month, year, days }) => {
				const result = workingDaysGenerator(month.toString(), year.toString());

				expect(result).toHaveLength(days.length);
				days.forEach((v, i) => {
					expect(result[i].getDate()).toBe(v);
				});
				expect(typeof result).toBe('object');
			}
		);
	});
});
