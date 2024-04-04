import { FC } from 'react';
import Button from '@components/ui/Button';
import { winnerType } from '@interfaces/blackjackType';

type Props = {
	winner: winnerType | null;
	onRestartGame: () => void;
};

const GameResultPanel: FC<Props> = (props) => {
	const winnerStatusDescription: Record<
		winnerType,
		{ title: string; description: string }
	> = {
		user: { title: 'Victory!', description: 'You won 1000 coins' },
		croupier: { title: 'Defeat!', description: 'You lose 1000 coins' },
		draw: { title: 'Draw!', description: 'The game ended in a draw.' }
	};

	return (
		props.winner && (
			<div className="bg-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3">
				<h5 className="text-xl">
					{winnerStatusDescription[props.winner].title}
				</h5>
				<p>{winnerStatusDescription[props.winner].description}</p>
				<div className="flex justify-center">
					<Button
						className="max-w-max"
						size="small"
						onClick={props.onRestartGame}
					>
						Restart game
					</Button>
				</div>
			</div>
		)
	);
};

export default GameResultPanel;
