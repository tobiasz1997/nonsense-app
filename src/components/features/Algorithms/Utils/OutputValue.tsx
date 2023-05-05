import React, { FC } from 'react';

type Props = {
	result?: string | null;
	error?: string;
};

const OutputValue: FC<Props> = ({ result, error }) => {
	return result ? (
		<div className="text-xl text-green-dark">
			Result:&nbsp;
			<span className="pl-4 font-bold text-orange underline">{result}</span>
		</div>
	) : error ? (
		<div className="text-xl text-red">{error}</div>
	) : null;
};

export default OutputValue;
