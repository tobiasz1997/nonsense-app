import { winnerType } from '@interfaces/blackjackType';
import { lastGameWinner } from '@store/slices/blackjack.slice';
import { useAppSelector } from '@store/store';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

const GameResultPanel: FC = () => {
	const t = useTranslations('blackjack');
	const lastWinner = useAppSelector((state) =>
		lastGameWinner(state.blackjackSlice)
	);

	const winnerTypeTitleKey: Record<winnerType, string> = {
		user: 'victory',
		croupier: 'defeat',
		draw: 'draw'
	};

	const winnerTypeDescriptionKey: Record<winnerType, string> = {
		user: 'wonCoins',
		croupier: 'lostCoins',
		draw: 'drawDescription'
	};

	return (
		lastWinner && (
			<div className="bg-pistachio dark:bg-zinc-500 dark:text-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3">
				<h5 className="text-xl">
					{t('result.' + winnerTypeTitleKey[lastWinner.winner])}
				</h5>
				<p className="text-sm lg:text-base">
					{t('result.' + winnerTypeDescriptionKey[lastWinner.winner], {
						count: Math.abs(lastWinner.coinsBalance)
					})}
				</p>
			</div>
		)
	);
};

export default GameResultPanel;
