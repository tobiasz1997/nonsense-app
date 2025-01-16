export const workingDaysGenerator = (month: string, year: string): Date[] => {
	const daysInMonth = getDays(+year, +month);
	return filterWorkingDays(daysInMonth);
};

const getDays = (year: number, month: number): Date[] => {
	const date = new Date(year, month, 1);
	let days: Date[] = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
};

const filterWorkingDays = (dates: Date[]): Date[] => {
	return dates.filter((date) => date.getDay() !== 0 && date.getDay() !== 6);
};
