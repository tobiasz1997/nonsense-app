import { motion } from 'framer-motion';
import React, { FC } from 'react';

type Props = {
	result?: string | null;
	error?: string;
};

const OutputValue: FC<Props> = ({ result, error }) => {
	return result ? (
		<motion.div
			key={result}
			initial={{ opacity: 0, y: 12, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			className="text-xl text-green-dark dark:text-pistachio"
		>
			Result:&nbsp;
			<span className="font-bold text-orange dark:text-yellow underline wrap-anywhere">
				{result}
			</span>
		</motion.div>
	) : error ? (
		<div className="text-xl text-red">{error}</div>
	) : null;
};

export default OutputValue;
