import { FC } from 'react';
import { winnerType } from '@interfaces/blackjackType';
import { lastGameWinner } from '@store/slices/blackjack.slice';
import { useAppSelector } from '@store/store';

const GameResultPanel: FC = () => {
	const lastWinner = useAppSelector((state) =>
		lastGameWinner(state.blackjackSlice)
	);

	const winnerTypeTitle: Record<winnerType, string> = {
		user: 'Victory!',
		croupier: 'Defeat!',
		draw: 'Draw!'
	};

	const winnerTypeDescription: Record<winnerType, (profit: number) => string> =
		{
			user: (profit) => `You won ${profit} coins`,
			croupier: (profit) => `You lose ${profit} coins`,
			draw: (_) => 'The game ended in a draw.'
		};

	return (
		lastWinner && (
			<div className="bg-pistachio dark:bg-zinc-500 dark:text-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3">
				<h5 className="text-xl">{winnerTypeTitle[lastWinner.winner]}</h5>
				<p>
					{winnerTypeDescription[lastWinner.winner](lastWinner.coinsBalance)}
				</p>
			</div>
		)
	);
};

export default GameResultPanel;
