import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { AppPage } from '@interfaces/appPage';
import ScheduleForm from '@components/features/Schedule/ScheduleForm';
import ScheduleDatesForm from '@components/features/Schedule/ScheduleDatesForm';
import { useState } from 'react';
import { workingDaysGenerator } from '@components/features/Schedule/workingDaysGenerator';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	}
});

const MyDoc = (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text>Section #1</Text>
			</View>
			<View style={styles.section}>
				<Text>Section #2</Text>
			</View>
		</Page>
	</Document>
);

const SchedulePage: AppPage = () => {
	// const [instance, updateInstance] = usePDF({ document: MyDoc });
	const [workingDays, setWorkingDays] = useState<Date[]>();

	// if (instance.loading) return <div>Loading ...</div>;
	//
	// if (instance.error) return <div>Something went wrong: {instance.error}</div>;
	//
	// if (!instance.url) return <div>No url</div>;

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Schedule</h1>

			<ScheduleForm
				onSubmit={(p) => {
					setWorkingDays(workingDaysGenerator(p.month, p.year));
				}}
			/>
			{workingDays && (
				<ScheduleDatesForm
					onSubmit={(p) => console.log(p)}
					dates={workingDays}
				/>
			)}

			{/*<a href={instance.url} download="test.pdf">*/}
			{/*	Download*/}
			{/*</a>*/}
		</div>
	);
};

SchedulePage.layoutType = 'full';
export default SchedulePage;
