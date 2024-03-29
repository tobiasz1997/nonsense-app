import { ChevronDownIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, PropsWithChildren, useState } from 'react';
import Divider from '@components/ui/Divider';

type Props = {
	label: string;
};

const ExpansionPanel: FC<PropsWithChildren & Props> = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<div className="flex items-center">
				<Divider />
				<button
					className="flex items-center gap-x-1 rounded p-2 font-bold text-orange focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange"
					onClick={() => setIsOpen((prev) => !prev)}
				>
					{props.label}
					<ChevronDownIcon
						className={cx('h-5 w-5 transition-all', {
							'rotate-180': isOpen
						})}
					/>
				</button>
				<Divider className="w-10" />
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: '0' }}
						animate={{ opacity: 1, height: '100%' }}
						exit={{ opacity: 0, height: '0' }}
					>
						{props.children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ExpansionPanel;
