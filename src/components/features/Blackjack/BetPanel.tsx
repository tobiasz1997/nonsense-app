import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import {
	forwardRef,
	ForwardRefRenderFunction,
	useEffect,
	useImperativeHandle,
	useState
} from 'react';
import DrawCoinsModal from '@components/features/Blackjack/DrawCoinsModal';
import { useAppDispatch, useAppSelector } from '@store/store';
import { setPlayerCoins } from '@store/slices/blackjack.slice';

type Props = {
	onStartGame: () => void;
};

export type BetPanelPropsRef = {
	getBetValue: () => number;
	doubleBet: () => void;
	clearBetValue: () => void;
};

const BetPanel: ForwardRefRenderFunction<BetPanelPropsRef, Props> = (
	props,
	ref
) => {
	const coinsValues: number[] = [50, 100, 200, 500, 1000];
	const [betValue, setBetValue] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [isDrawCoinsVisible, setIsDrawCoinsVisible] = useState(false);

	const playerCoins = useAppSelector(
		(state) => state.blackjackSlice.userData.coins
	);
	const dispatch = useAppDispatch();

	useImperativeHandle(
		ref,
		() => ({
			getBetValue: () => betValue,
			doubleBet: () => setBetValue((prevState) => prevState * 2),
			clearBetValue: () => {
				setGameStarted(false);
				setBetValue(0);
			}
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
		setBetValue(playerCoins);
	};

	const startGame = () => {
		setGameStarted(true);
		props.onStartGame();
	};

	return (
		<>
			<div className="rounded border border-green-dark bg-yellow w-full overflow-hidden">
				<div className="flex justify-between border-b border-green-dark p-3 font-bold text-lg text-green-dark">
					<div>{playerCoins} coins</div>
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
									disabled={playerCoins - betValue < value || gameStarted}
								>
									<PlusIcon className="h-4 w-4" />
								</button>
								<button
									className="bg-orange w-full p-1 flex justify-center disabled:opacity-50 hover:bg-orange/[0.7]"
									onClick={() => removeCoins(value)}
									disabled={betValue < value || gameStarted}
								>
									<MinusIcon className="h-4 w-4" />
								</button>
							</div>
						</div>
					))}
					<button
						className="bg-orange w-full p-1 border-r border-green-dark flex justify-center items-center font-bold disabled:opacity-50 hover:bg-orange/[0.7]"
						onClick={betAll}
						disabled={
							playerCoins <= 0 || playerCoins === betValue || gameStarted
						}
					>
						All in
					</button>
					<button
						className="bg-orange w-full p-1 flex justify-center items-center font-bold disabled:opacity-50 hover:bg-orange/[0.7]"
						onClick={startGame}
						disabled={betValue === 0 || gameStarted}
					>
						Play
					</button>
					{playerCoins <= 0 && (
						<button
							className="border-l border-green-dark bg-orange w-full p-1 flex justify-center items-center font-bold disabled:opacity-50 hover:bg-orange/[0.7]"
							onClick={() => setIsDrawCoinsVisible(true)}
						>
							Draw Coins
						</button>
					)}
				</div>
			</div>
			{isDrawCoinsVisible && (
				<DrawCoinsModal
					onClose={() => setIsDrawCoinsVisible(false)}
					afterDraw={(coins) => {
						setIsDrawCoinsVisible(false);
						dispatch(setPlayerCoins(coins));
					}}
				/>
			)}
		</>
	);
};

export default forwardRef(BetPanel);
