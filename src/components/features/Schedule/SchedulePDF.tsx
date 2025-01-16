import {
	Document,
	Font,
	Page,
	StyleSheet,
	Text,
	View
} from '@react-pdf/renderer';
import { FC } from 'react';
import { ISchedule } from '@interfaces/scheduleType';

type Props = {
	data: ISchedule;
};

Font.register({
	family: 'Inter',
	fonts: [
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
			fontWeight: 400
		},
		{
			src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
			fontWeight: 700
		}
	]
});

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Inter',
		flexDirection: 'column',
		backgroundColor: '#E4E4E4'
	},
	header: {
		margin: 10,
		padding: 10,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
	},
	headerText: {
		marginBottom: 5
	},
	tableWrapper: {
		margin: 20,
		flexDirection: 'column',
		borderStyle: 'solid',
		borderColor: 'black',
		borderWidth: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: 'black'
	},
	id: {
		width: '10%'
	},
	day: {
		width: '15%'
	},
	project: {
		width: '30%'
	},
	hours: {
		width: '15%'
	},
	comment: {
		width: '30%'
	},
	bold: {
		fontWeight: 'bold'
	},
	value: {
		padding: 2,
		textAlign: 'center'
	},
	borderRight: {
		borderRightWidth: 1,
		borderRightStyle: 'solid',
		borderRightColor: 'black'
	}
});

const SchedulePDF: FC<Props> = (props) => {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{props.data.title}</Text>
					<Text style={styles.headerText}>{props.data.author}</Text>
					<Text style={styles.headerText}>
						{+props.data.month + 1}/{props.data.year}
					</Text>
				</View>
				<View style={styles.tableWrapper}>
					<View style={[styles.row, styles.bold]}>
						<Text style={[styles.id, styles.value, styles.borderRight]}> </Text>
						<Text style={[styles.day, styles.value, styles.borderRight]}>
							Dzień
						</Text>
						<Text style={[styles.project, styles.value, styles.borderRight]}>
							Projekt
						</Text>
						<Text style={[styles.hours, styles.value, styles.borderRight]}>
							Godziny
						</Text>
						<Text style={[styles.comment, styles.value]}>Komentarz</Text>
					</View>
					{props.data.plans.map((x, idx) => (
						<View style={styles.row} key={idx.toString()}>
							<Text style={[styles.id, styles.value, styles.borderRight]}>
								{(idx + 1).toString()}
							</Text>
							<Text style={[styles.day, styles.value, styles.borderRight]}>
								{x.day.toString()}
							</Text>
							<Text style={[styles.project, styles.value, styles.borderRight]}>
								{x.project}
							</Text>
							<Text style={[styles.hours, styles.value, styles.borderRight]}>
								{x.hours}
							</Text>
							<Text style={[styles.comment, styles.value]}>{x.comment}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	);
};

export default SchedulePDF;
