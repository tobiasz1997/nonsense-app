import { FC, PropsWithChildren } from 'react';

type Props = {
	playerName: string;
	points: number;
};

const PlayerBoard: FC<PropsWithChildren & Props> = (props) => {
	return (
		<div className="flex bg-green flex-col items-center gap-3 border rounded shadow-xl border-green-dark p-3 max-w-max">
			<div className="flex justify-between items-center w-full">
				<h5 className="text-green-dark font-semibold text-lg">
					{props.playerName}
				</h5>
				{props.points > 0 && (
					<p className="text-green-dark font-bold">{props.points}</p>
				)}
			</div>
			{props.points > 0 && (
				<div className="flex gap-3 justify-center">{props.children}</div>
			)}
		</div>
	);
};

export default PlayerBoard;
