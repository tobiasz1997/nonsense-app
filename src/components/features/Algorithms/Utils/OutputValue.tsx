import React, { FC } from 'react';

type Props = {
	result?: string | null;
	error?: string;
};

const OutputValue: FC<Props> = ({ result, error }) => {
	return result ? (
		<div className="text-xl text-green-dark dark:text-pistachio">
			Result:&nbsp;
			<span className="pl-4 font-bold text-orange dark:text-yellow underline">
				{result}
			</span>
		</div>
	) : error ? (
		<div className="text-xl text-red">{error}</div>
	) : null;
};

export default OutputValue;
