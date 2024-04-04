import { FC } from 'react';
import { useAppSelector } from '@store/store';

type Props = {};

const GameStatsPanel: FC<Props> = (props) => {
	const gamesStats = useAppSelector((state) => state.blackjackSlice.gameStats);

	return (
		<div className="bg-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3">
			<h5 className="text-xl">Game stats</h5>
			{gamesStats.map((data, index) => (
				<div className="flex gap-1" key={index}>
					<p className="w-1/3 text-left">{data.winner}</p>
					<p className="w-1/3">
						{data.croupierPoints} - {data.playerPoints}
					</p>
					<p className="w-1/3 text-right">
						{data.coinsBalance > 0 && '+'}
						{data.coinsBalance}
					</p>
				</div>
			))}
		</div>
	);
};

export default GameStatsPanel;
