import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	useState
} from 'react';

type Props = {
	userPoints: number;
};

export type BetPanelPropsRef = {
	getBetValue: () => number;
	clearBetValue: () => void;
};

const BetPanel: ForwardRefRenderFunction<BetPanelPropsRef, Props> = (
	props,
	ref
) => {
	const coinsValues: number[] = [50, 100, 200, 500, 1000];
	const [betValue, setBetValue] = useState(0);

	useImperativeHandle(
		ref,
		() => ({
			getBetValue: () => betValue,
			clearBetValue: () => setBetValue(0)
		}),
		[betValue]
	);

	const addCoins = (value: number) => {
		setBetValue((prevState) => prevState + value);
	};

	const removeCoins = (value: number) => {
		setBetValue((prevState) => prevState - value);
	};

	const betAll = () => {
		setBetValue(props.userPoints);
	};

	return (
		<div className="rounded border border-green-dark bg-yellow w-full overflow-hidden">
			<div className="flex justify-between border-b border-green-dark p-3 font-bold text-lg text-green-dark">
				<div>{props.userPoints} coins</div>
				{betValue && <div>+{betValue}</div>}
			</div>
			<div className="flex">
				{coinsValues.map((value, index) => (
					<div
						key={index}
						className="w-full text-center border-r border-green-dark font-bold"
					>
						<div className="border-b border-green-dark">{value}</div>
						<div className="flex">
							<button
								className="bg-orange w-full p-1 flex justify-center border-r border-green-dark disabled:opacity-50 hover:bg-orange/[0.7]"
								onClick={() => addCoins(value)}
								disabled={props.userPoints - betValue < value}
							>
								<PlusIcon className="h-4 w-4" />
							</button>
							<button
								className="bg-orange w-full p-1 flex justify-center disabled:opacity-50 hover:bg-orange/[0.7]"
								onClick={() => removeCoins(value)}
								disabled={betValue < value}
							>
								<MinusIcon className="h-4 w-4" />
							</button>
						</div>
					</div>
				))}
				<button
					className="bg-orange w-full p-1 flex justify-center items-center font-bold disabled:opacity-50 hover:bg-orange/[0.7]"
					onClick={betAll}
					disabled={props.userPoints === 0 || props.userPoints === betValue}
				>
					All in
				</button>
			</div>
		</div>
	);
};

export default forwardRef(BetPanel);
