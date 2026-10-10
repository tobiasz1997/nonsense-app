import { getTotalScheduleHours } from '@components/features/Schedule/replaceScheduleHelpers';
import { ISchedule } from '@interfaces/scheduleType';
import * as XLSX from 'xlsx-js-style';
import { generateFileName } from './scheduleHelpers';

export async function exportScheduleToXlsx(schedule: ISchedule) {
	const rows = [...schedule.plans]
		.sort((a, b) => a.day - b.day)
		.map((entry) => ({
			Data: new Date(+schedule.year, +schedule.month - 1, entry.day, 12),
			Projekt: entry.project,
			Godziny: Number(entry.hours),
			Komentarz: entry.comment
		}));

	const worksheet = XLSX.utils.json_to_sheet(rows, {
		cellDates: true
	});

	['A1', 'B1', 'C1', 'D1'].forEach((cellAddress) => {
		const cell = worksheet[cellAddress];

		if (!cell) return;

		cell.s = {
			font: {
				bold: true
			}
		};
	});

	for (let row = 2; row <= rows.length + 1; row++) {
		const cell = worksheet[`A${row}`];

		if (cell) {
			cell.z = 'dd.mm.yyyy';
		}
	}

	XLSX.utils.sheet_add_aoa(
		worksheet,
		[['', '', getTotalScheduleHours(schedule.plans), '']],
		{
			origin: -1
		}
	);

	if (schedule.description) {
		const descriptionRow = rows.length + 4;

		XLSX.utils.sheet_add_aoa(worksheet, [['', schedule.description]], {
			origin: `A${descriptionRow}`
		});

		worksheet[`B${descriptionRow}`].s = {
			alignment: {
				wrapText: true,
				vertical: 'top'
			}
		};

		worksheet['!merges'] ??= [];
		worksheet['!merges'].push({
			s: {
				r: descriptionRow - 1,
				c: 1
			},
			e: {
				r: descriptionRow - 1,
				c: 3
			}
		});
		const linesCount = schedule.description.split(/\r?\n/).length;

		worksheet['!rows'] ??= [];
		worksheet['!rows'][descriptionRow - 1] = {
			hpt: Math.max(20, linesCount * 18)
		};
	}

	worksheet['!cols'] = [{ wch: 14 }, { wch: 30 }, { wch: 12 }, { wch: 50 }];

	const workbook = XLSX.utils.book_new();

	XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedule');

	const filename = `${generateFileName(schedule)}.xlsx`;

	XLSX.writeFile(workbook, filename, {
		compression: true,
		cellStyles: true
	});
}
