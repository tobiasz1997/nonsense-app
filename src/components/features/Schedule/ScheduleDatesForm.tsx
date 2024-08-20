import React, { FC } from 'react';
import CustomBox from '@components/ui/CustomBox';

type Props = {
	dates: Date[];
	onSubmit: (payload: any) => void;
};

const ScheduleDatesForm: FC<Props> = (props) => {
	return (
		<CustomBox title="Schedule Form">
			{props.dates.map((date, index) => (
				<div key={index}>{date.toDateString()}</div>
			))}
		</CustomBox>
	);
};

export default ScheduleDatesForm;
