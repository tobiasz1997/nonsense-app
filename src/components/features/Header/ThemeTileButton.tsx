import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, FC, ReactElement, SVGProps } from 'react';

type Props = {
	icon: ReactElement<SVGProps<SVGSVGElement>>;
	active: boolean;
	onClick: () => void;
};

const ThemeTileButton: FC<Props> = (props) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className="relative grid h-[34px] w-[34px] place-items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-dark dark:focus-visible:ring-pistachio cursor-pointer"
		>
			{props.active && (
				<motion.span
					layoutId="theme-switcher-thumb"
					className="absolute inset-0 rounded bg-beige shadow-md dark:bg-zinc-700"
					transition={{
						type: 'spring',
						stiffness: 420,
						damping: 32
					}}
				/>
			)}

			<AnimatePresence mode="wait" initial={false}>
				<motion.span
					className={cx(
						'relative z-10',
						props.active
							? 'text-orange dark:text-indigo-300'
							: 'text-zinc-500 dark:text-gray-500'
					)}
					initial={{
						opacity: 0,
						rotate: props.active ? -90 : 90,
						scale: 0.5
					}}
					animate={{
						opacity: 1,
						rotate: 0,
						scale: props.active ? 1.1 : 0.9
					}}
					exit={{
						opacity: 0,
						rotate: props.active ? 90 : -90,
						scale: 0.5
					}}
					transition={{
						duration: 0.22,
						ease: 'easeOut'
					}}
				>
					{cloneElement(
						props.icon,
						{
							className: 'w-5 h-5 stroke-2'
						},
						null
					)}
				</motion.span>
			</AnimatePresence>
		</button>
	);
};

export default ThemeTileButton;
