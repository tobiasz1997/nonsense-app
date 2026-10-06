import { ISchedule } from "@interfaces/scheduleType";
import { generateFileName } from "./scheduleHelpers";

export async function exportScheduleToXlsx(schedule: ISchedule) {
  const XLSX = await import("xlsx");

  const rows = [...schedule.plans]
    .sort((a, b) => a.day - b.day)
    .map((entry) => ({
      Data: new Date(+schedule.year, +schedule.month - 1, entry.day, 12),
      Projekt: entry.project,
      Godziny: Number(entry.hours),
      Komentarz: entry.comment,
    }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    cellDates: true,
  });

  for (let row = 2; row <= rows.length + 1; row++) {
    const cell = worksheet[`A${row}`];

    if (cell) {
      cell.z = "dd.mm.yyyy";
    }
  }

  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 30 },
    { wch: 12 },
    { wch: 50 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Schedule"
  );

  const filename = `${generateFileName(schedule)}.xlsx`;

  XLSX.writeFile(workbook, filename, {
    compression: true,
  });
}