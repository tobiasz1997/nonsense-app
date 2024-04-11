import { FC } from 'react';
import { useAppSelector } from '@store/store';

const GameStatsPanel: FC = () => {
	const gamesStats = useAppSelector((state) => state.blackjackSlice.gameStats);

	return gamesStats.length > 0 ? (
		<div className="bg-pistachio dark:bg-zinc-500 dark:text-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3 max-h-80 overflow-y-scroll">
			<h5 className="text-xl">Game stats</h5>
			{gamesStats.map((data, index) => (
				<div className="flex gap-1 text-sm lg:text-base" key={index}>
					<p className="w-1/3 text-left truncate">{data.winner}</p>
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
	) : (
		<></>
	);
};

export default GameStatsPanel;
