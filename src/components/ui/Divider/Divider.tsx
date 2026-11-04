import cx from 'classnames';
import React, { FC, HTMLAttributes } from 'react';

const Divider: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	return (
		<div
			className={cx(['h-0.5 rounded-sm bg-orange', props.className], {
				'w-full': !props.className
			})}
		/>
	);
};

export default Divider;
