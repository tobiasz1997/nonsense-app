import React, { FC } from 'react';

type Props = {
	value: string | null;
};

const InstanceValue: FC<Props> = (props) => {
	return (
		<div className="text-green-dark dark:text-pistachio">
			Current array: &nbsp;
			<span className="pl-2 font-bold">{props.value}</span>
		</div>
	);
};

export default InstanceValue;
