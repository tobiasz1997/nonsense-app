import { FC, useMemo } from 'react';
import { useAppSelector } from '@store/store';

const PlayerStatsPanel: FC = () => {
	const playerCoins = useAppSelector(
		(state) => state.blackjackSlice.userData.coins
	);
	const gameStats = useAppSelector((state) => state.blackjackSlice.gameStats);

	const gameBalance: string = useMemo(() => {
		const playerWins = gameStats.filter((x) => x.winner === 'user').length;
		const draws = gameStats.filter((x) => x.winner === 'draw').length;
		const croupierWins = gameStats.length - playerWins - draws;

		return `${playerWins} - ${draws} - ${croupierWins}`;
	}, [gameStats]);

	const profit: number = useMemo(() => {
		return gameStats.reduce((a, b) => a + b.coinsBalance, 0);
	}, [gameStats]);

	return (
		<div className="bg-pistachio dark:bg-zinc-500 dark:text-pistachio shadow-xl text-center font-bold text-green-dark rounded p-3 space-y-3">
			<h5 className="text-xl">Player stats</h5>
			<div className="flex justify-between">
				<p>Coins</p>
				<p>{playerCoins}</p>
			</div>
			<div className="flex justify-between">
				<p>Game balance</p>
				<p>{gameBalance}</p>
			</div>
			<div className="flex justify-between">
				<p>Profit</p>
				<p>{profit}</p>
			</div>
		</div>
	);
};

export default PlayerStatsPanel;
