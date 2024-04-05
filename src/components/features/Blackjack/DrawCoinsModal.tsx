import React, { FC, useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import useGenerator from '@hooks/useGenerator';

type Props = {
	onClose: () => void;
	afterDraw: (coins: number) => void;
};

const DrawCoinsModal: FC<Props> = (props) => {
	const [generatedNumber, setGeneratedNumber] = useState(0);
	const [isGenerating, setIsGenerating] = useState(false);
	const { generateRandomNumber } = useGenerator();

	useEffect(() => {
		const interval = setInterval(() => {
			const number = generateRandomNumber(50, 50_000, 50);
			isGenerating && setGeneratedNumber(number);
		}, 100);

		return () => clearInterval(interval);
	}, [isGenerating]);

	const drawNumber = () => {
		setIsGenerating(true);
	};

	const stopDraw = () => {
		setIsGenerating(false);
	};

	return (
		<Modal>
			<div className="m-3 w-full max-w-screen-sm">
				<div className="relative rounded-xl bg-pistachio p-5">
					<div className="absolute top-3 right-3">
						<button
							onClick={props.onClose}
							className="flex items-center justify-center p-1"
						>
							<XMarkIcon className="h-5 w-5 text-orange" />
						</button>
					</div>
					<h2 className="text-xl font-bold text-orange md:text-3xl">
						Draw Coins
					</h2>
					<p className="text-green-dark text-3xl text-center font-bold mt-3 mb-5">
						{generatedNumber}
					</p>
					<div className="flex justify-center">
						{!isGenerating && generatedNumber === 0 && (
							<Button className="max-w-max" onClick={drawNumber}>
								Draw
							</Button>
						)}
						{isGenerating && (
							<Button className="max-w-max" onClick={stopDraw}>
								Stop
							</Button>
						)}
						{!isGenerating && generatedNumber > 0 && (
							<Button
								className="max-w-max"
								onClick={() => props.afterDraw(generatedNumber)}
							>
								Ok
							</Button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default DrawCoinsModal;
