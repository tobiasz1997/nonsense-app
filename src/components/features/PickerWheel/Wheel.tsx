import Button from '@components/ui/Button';
import {
	ArrowPathIcon,
	PlayIcon,
	PlusIcon,
	TrophyIcon
} from '@heroicons/react/24/solid';
import useIsMobile from '@hooks/useIsMobile';
import { WheelOption } from '@interfaces/wheelOption';
import {
	openGetSetOptionsModal,
	openManageOptionFormModal,
	openManageOptionsFormModal
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch } from '@store/store';
import { generateRandomIntNumber } from '@utils/generators/sharedGenerators';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC, useMemo, useState } from 'react';

type Props = {
	options: WheelOption[];
	winner: WheelOption | null;
	setWinner: (winner: WheelOption) => void;
};

const Wheel: FC<Props> = ({ options, winner, setWinner }) => {
	const [rotation, setRotation] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);

	const dispatch = useAppDispatch();

	const isMobile = useIsMobile(400);

	const gradient = useMemo(() => {
		const segmentAngle = 360 / options.length;

		return `conic-gradient(${options
			.map((option, index) => {
				const start = index * segmentAngle;
				const end = (index + 1) * segmentAngle;
				return `${option.color} ${start}deg ${end}deg`;
			})
			.join(', ')})`;
	}, [options]);

	const randomDuration = useMemo(
		() => generateRandomIntNumber(5_000, 10_000),
		[]
	);

	const spinWheel = () => {
		if (isSpinning || winner) return;

		setIsSpinning(true);

		const winnerIndex = Math.floor(Math.random() * options.length);
		const fullSpins = 5 + Math.floor(Math.random() * 4);
		const segmentAngle = 360 / options.length;

		const targetAngle =
			360 -
			(winnerIndex * segmentAngle +
				generateRandomIntNumber(1, segmentAngle - 1));

		setRotation((previousRotation) => {
			const currentAngle = previousRotation % 360;
			const deltaToTarget = (targetAngle - currentAngle + 360) % 360;

			return previousRotation + fullSpins * 360 + deltaToTarget;
		});

		window.setTimeout(() => {
			setWinner(options[winnerIndex]);
			setIsSpinning(false);
		}, randomDuration);
	};

	return (
		<>
			{options.length > 0 ? (
				<div className="relative w-full max-w-120 aspect-square flex items-center justify-center">
					<div className="absolute -top-3 z-20 w-0 h-0 border-l-[18px] border-r-[18px] border-t-[34px] border-l-transparent border-r-transparent border-t-green dark:border-t-white drop-shadow-lg" />

					<motion.div
						className="relative w-full h-full rounded-full border-8 border-green dark:border-pistachio overflow-hidden"
						style={{ background: gradient }}
						animate={{ rotate: rotation }}
						transition={{
							duration: randomDuration / 1000,
							ease: [0.12, 0.75, 0.16, 1]
						}}
					>
						{options.map((item, index) => {
							const segmentAngle = 360 / options.length;
							const angle = index * segmentAngle + segmentAngle / 2;

							return (
								<div
									key={`${item.name}-${index}`}
									className="absolute left-1/2 top-1/2"
									style={{
										transform: `translate(-55%, -55%) rotate(${angle}deg) translateY(${isMobile ? '-80px' : '-160px'})`
									}}
								>
									<div
										className={cx(
											'w-24 text-center text-lg font-extrabold text-shadow-sm text-white drop-shadow-md',
											{
												'text-sm': options.length > 10,
												'text-xs': options.length > 20
											}
										)}
										style={{
											transform: `rotate(-90deg)`
										}}
									>
										{item.name}
									</div>
								</div>
							);
						})}

						<div
							className="absolute inset-[36%] rounded-full bg-pistachio border-4 border-green dark:border-white flex items-center justify-center text-center"
							style={{
								transform: `rotate(-${rotation % 360}deg)`
							}}
						>
							{winner ? (
								<TrophyIcon
									className="h-8 w-8"
									style={{
										color: `${winner.color}`
									}}
								/>
							) : isSpinning ? (
								<ArrowPathIcon className="text-green-dark h-8 w-8" />
							) : (
								<button
									className="w-full h-full rounded-full cursor-pointer flex justify-center items-center focus:ring-green-dark focus:outline-none focus:ring-4"
									onClick={spinWheel}
								>
									<PlayIcon className="text-green-dark h-8 w-8" />
								</button>
							)}
						</div>
					</motion.div>
				</div>
			) : (
				<div className="flex flex-col sm:flex-row gap-4">
					<Button
						icon={<PlusIcon />}
						onClick={() => dispatch(openManageOptionsFormModal())}
						className="max-w-max"
					>
						Add Options
					</Button>

					<Button
						icon={<PlusIcon />}
						onClick={() => dispatch(openManageOptionFormModal())}
						className="max-w-max"
					>
						Add Option
					</Button>

					<Button
						icon={<PlusIcon />}
						onClick={() => dispatch(openGetSetOptionsModal())}
						className="max-w-max"
					>
						Set Options Form Token
					</Button>
				</div>
			)}
		</>
	);
};

export default Wheel;
