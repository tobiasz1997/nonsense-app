import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import TypewriterText from '@components/ui/TypewriterText';
import useGenerator from '@hooks/useGenerator';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';

type Props = {
	onClose: () => void;
	afterDraw: (coins: number) => void;
};

const DrawCoinsModal: FC<Props> = (props) => {
	const t = useTranslations();

	const [generatedNumber, setGeneratedNumber] = useState(0);
	const [isGenerating, setIsGenerating] = useState(false);

	const { generateRandomNumber } = useGenerator();

	useEffect(() => {
		const interval = setInterval(() => {
			const number = generateRandomNumber(50, 50_000, 50);
			isGenerating && setGeneratedNumber(number);
		}, 500);

		return () => clearInterval(interval);
	}, [generateRandomNumber, isGenerating]);

	const drawNumber = () => {
		setIsGenerating(true);
	};

	const stopDraw = () => {
		setIsGenerating(false);
	};

	return (
		<Modal>
			<ModalBox onClose={props.onClose}>
				<h2 className="na-modal-title">{t('blackjack.drawCoins')}</h2>
				<p className="text-green-dark dark:text-yellow text-3xl text-center font-bold mt-3 mb-5">
					<TypewriterText text={generatedNumber.toString()} />
				</p>
				<div className="flex justify-center">
					{!isGenerating && generatedNumber === 0 && (
						<Button className="max-w-max" onClick={drawNumber}>
							{t('blackjack.draw')}
						</Button>
					)}
					{isGenerating && (
						<Button className="max-w-max" onClick={stopDraw}>
							{t('blackjack.stop')}
						</Button>
					)}
					{!isGenerating && generatedNumber > 0 && (
						<Button
							className="max-w-max"
							onClick={() => props.afterDraw(generatedNumber)}
						>
							{t('common.ok')}
						</Button>
					)}
				</div>
			</ModalBox>
		</Modal>
	);
};

export default DrawCoinsModal;
