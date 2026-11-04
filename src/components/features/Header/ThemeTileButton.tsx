import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, FC, ReactElement, SVGProps } from 'react';

type Props = {
	layoutId: string;
	icon: ReactElement<SVGProps<SVGSVGElement>>;
	active: boolean;
	shouldAnimate: boolean;
	onClick: () => void;
	onAnimationComplete?: () => void;
};

const ThemeTileButton: FC<Props> = (props) => {
	return (
		<button
			type="button"
			onClick={props.onClick}
			className="relative grid h-8.5 w-8.5 place-items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-dark dark:focus-visible:ring-pistachio cursor-pointer"
		>
			{props.active && (
				<motion.span
					initial={false}
					layoutId={props.layoutId}
					onLayoutAnimationComplete={
						props.shouldAnimate ? props.onAnimationComplete : undefined
					}
					className="absolute inset-0 rounded bg-beige shadow-md dark:bg-zinc-700"
					transition={
						props.shouldAnimate
							? { type: 'spring', stiffness: 420, damping: 32 }
							: { duration: 0 }
					}
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
					initial={false}
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
						duration: props.shouldAnimate ? 0.22 : 0,
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
