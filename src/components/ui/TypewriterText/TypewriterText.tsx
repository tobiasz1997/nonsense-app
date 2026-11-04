import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';

type Props = {
	text: string;
	className?: string;
};

const TypewriterText: FC<Props> = (props) => {
	const letters = Array.from(props.text);

	return (
		<AnimatePresence mode="wait">
			<motion.span
				key={props.text}
				className={cx('inline-block whitespace-pre-wrap', props.className)}
				initial="hidden"
				animate="visible"
				exit={{ opacity: 0, y: -4 }}
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: letters.length > 50 ? 0.002 : 0.02
						}
					}
				}}
			>
				{letters.map((letter, index) => (
					<motion.span
						key={`${letter}-${index}`}
						className="inline-block"
						variants={{
							hidden: {
								opacity: 0,
								y: 4
							},
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.4
								}
							}
						}}
					>
						{letter}
					</motion.span>
				))}
			</motion.span>
		</AnimatePresence>
	);
};

export default TypewriterText;
