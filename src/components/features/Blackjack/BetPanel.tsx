import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import cx from 'classnames';
import {
	forwardRef,
	ForwardRefRenderFunction,
	useImperativeHandle,
	useState
} from 'react';
import DrawCoinsModal from '@components/features/Blackjack/DrawCoinsModal';
import { setPlayerCoins } from '@store/slices/blackjack.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

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

	const changeBetValueButtonStyles =
		'bg-orange w-full p-1 flex justify-center disabled:opacity-50 hover:bg-orange/[0.7]';
	const actionButtonStyles =
		'bg-orange w-full p-1 flex justify-center items-center font-bold disabled:opacity-50 hover:bg-orange/[0.7]';

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
			<div className="rounded border border-green-dark bg-yellow w-full overflow-hidden divide-green-dark divide-y">
				<div className="flex justify-between p-3 font-bold text-lg text-green-dark">
					<div>{playerCoins} coins</div>
					{betValue && <div>+{betValue}</div>}
				</div>
				<div className="block md:flex">
					<div className="flex flex-1">
						{coinsValues.map((value, index) => (
							<div
								key={index}
								className="w-full text-center font-bold divide-green-dark divide-y border-r last:border-0 md:last:border-r border-green-dark"
							>
								<div className="">{value}</div>
								<div className="flex">
									<button
										className={cx(
											'border-r border-green-dark',
											changeBetValueButtonStyles
										)}
										onClick={() => addCoins(value)}
										disabled={playerCoins - betValue < value || gameStarted}
									>
										<PlusIcon className="h-4 w-4" />
									</button>
									<button
										className={changeBetValueButtonStyles}
										onClick={() => removeCoins(value)}
										disabled={betValue < value || gameStarted}
									>
										<MinusIcon className="h-4 w-4" />
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-1 divide-green-dark divide-x border-t md:border-0 border-green-dark">
						<button
							className={actionButtonStyles}
							onClick={betAll}
							disabled={
								playerCoins <= 0 || playerCoins === betValue || gameStarted
							}
						>
							All in
						</button>
						<button
							className={actionButtonStyles}
							onClick={startGame}
							disabled={betValue === 0 || gameStarted}
						>
							Play
						</button>
						{playerCoins <= 0 && (
							<button
								className={actionButtonStyles}
								onClick={() => setIsDrawCoinsVisible(true)}
							>
								Draw Coins
							</button>
						)}
					</div>
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
