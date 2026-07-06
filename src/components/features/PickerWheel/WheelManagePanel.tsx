import OptionsManager from '@components/features/PickerWheel/OptionsManager';
import Button from '@components/ui/Button';
import { CubeIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { WheelOption } from '@interfaces/wheelOption';
import { clearWinner, shuffleOptions } from '@store/slices/pickerWheel.slice';
import { useAppDispatch } from '@store/store';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

type Props = {
	winner: WheelOption | null;
};

const WheelManagePanel: FC<Props> = ({ winner }) => {
	const dispatch = useAppDispatch();

	return (
		<>
			<div className="flex flex-col gap-4">
				{winner && (
					<>
						<motion.div
							initial={{ opacity: 0, y: 12, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							className="rounded px-6 py-4 text-center text-shadow-xl text-white text-shadow-2xs"
							style={{
								background: `${winner.color}`
							}}
						>
							<p>Winner:</p>
							<p className="text-2xl font-bold">{winner.name}</p>
						</motion.div>
					</>
				)}
				<div className="flex flex-wrap gap-4">
					<Button
						className="flex-1"
						icon={<CubeIcon />}
						onClick={() => dispatch(shuffleOptions())}
					>
						Shuffle
					</Button>
					{winner && (
						<Button
							className="flex-1"
							icon={<XCircleIcon />}
							onClick={() => dispatch(clearWinner())}
						>
							Reset
						</Button>
					)}
				</div>
			</div>
			<OptionsManager />
		</>
	);
};

export default WheelManagePanel;
