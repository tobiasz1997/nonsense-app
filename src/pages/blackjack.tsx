import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import { drawCards, shuffleCards } from '@api/deck-of-cards.api';
import BetPanel, {
	BetPanelPropsRef
} from '@components/features/Blackjack/BetPanel';
import Card from '@components/features/Blackjack/Card';
import PlayerBoard from '@components/features/Blackjack/PlayerBoard';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import { AppPage } from '@interfaces/appPage';
import {
	IDrawCardsResponse,
	IShuffleCardsResponse,
	winnerType
} from '@interfaces/blackjackType';
import {
	setCroupierData,
	setGameStats,
	setUserData
} from '@store/slices/blackjack.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

const BlackJackPage: AppPage = () => {
	const [winner, setWinner] = useState<winnerType | null>(null);
	const betPanelRef = useRef<BetPanelPropsRef>(null);
	const [errorModalVisible, setErrorModalVisible] = useState(false);
	const userCards = useAppSelector((state) => state.blackjackSlice.userData);
	const croupierCards = useAppSelector(
		(state) => state.blackjackSlice.croupierData
	);
	const deckId = useAppSelector((state) => state.blackjackSlice.deckId);
	const gamesStats = useAppSelector((state) => state.blackjackSlice.gameStats);
	const remainingCards = useAppSelector(
		(state) => state.blackjackSlice.remainingCards
	);
	const dispatch = useAppDispatch();

	const winnerStatusDescription: Record<
		winnerType,
		{ title: string; description: string }
	> = {
		user: { title: 'Victory!', description: 'You won 1000 coins' },
		croupier: { title: 'Defeat!', description: 'You lose 1000 coins' },
		draw: { title: 'Draw!', description: 'The game ended in a draw.' }
	};

	const startGame = useCallback(async () => {
		setWinner(null);
		const shuffleCardsResponse = await dispatch(shuffleCards());
		const deckIdFromResponse = (
			shuffleCardsResponse.payload as IShuffleCardsResponse
		).deck_id;
		if (!deckIdFromResponse) {
			setErrorModalVisible(true);
			return;
		}
		dispatch(drawCards({ deckId: deckIdFromResponse, count: 3 })).then(
			(results) => {
				const typedResults = results.payload as IDrawCardsResponse;
				dispatch(
					setCroupierData({
						points: getBestValueDependingOnCard(typedResults.cards[0].value, 0),
						cards: [typedResults.cards[0], null]
					})
				);

				let startValue = 0;
				startValue += getBestValueDependingOnCard(
					typedResults.cards[1].value,
					0
				);
				startValue += getBestValueDependingOnCard(
					typedResults.cards[2].value,
					startValue
				);

				dispatch(
					setUserData({
						points: startValue,
						cards: [typedResults.cards[1], typedResults.cards[2]]
					})
				);
			}
		);
	}, [dispatch]);

	useEffect(() => {
		if (!deckId && !winner) {
			console.log('init start game');
			void startGame();
		}
	}, [deckId, startGame, winner]);

	const hitCard = async () => {
		if (!deckId) {
			setErrorModalVisible(true);
			return;
		}
		dispatch(drawCards({ deckId: deckId, count: 1 })).then((results) => {
			const typedResults = results.payload as IDrawCardsResponse;
			const points =
				userCards.points +
				getBestValueDependingOnCard(
					typedResults.cards[0].value,
					userCards.points
				);
			dispatch(
				setUserData({
					points: points,
					cards: [...userCards.cards, typedResults.cards[0]]
				})
			);
			if (points > 21) {
				finishGame('croupier', croupierCards.points, points);
			}
		});
	};

	const standGame = () => {
		if (!deckId) {
			setErrorModalVisible(true);
			return;
		}
		dispatch(drawCards({ deckId: deckId, count: 10 })).then((results) => {
			const typedResults = results.payload as IDrawCardsResponse;
			let points = croupierCards.points;
			let cards = [...croupierCards.cards.filter((x) => x !== null)];
			for (let result of typedResults.cards) {
				if (points >= 17 && points >= userCards.points && points <= 21) {
					if (points === userCards.points) {
						finishGame('draw', points, userCards.points);
					} else {
						finishGame('croupier', points, userCards.points);
					}
					break;
				}

				points += getBestValueDependingOnCard(result.value, points);
				cards.push(result);
				if (points > 21) {
					finishGame('user', points, userCards.points);
					break;
				}
			}
			dispatch(
				setCroupierData({
					points: points,
					cards: cards
				})
			);
		});
	};

	const finishGame = (
		winner: winnerType,
		croupierPoints: number,
		playerPoints: number
	) => {
		setWinner(winner);
		let balance = 0;
		const betValue = betPanelRef.current?.getBetValue();
		if (!betValue) {
			setErrorModalVisible(true);
			return;
		}
		switch (winner) {
			case 'user':
				balance += betValue * 1.5;
				break;
			case 'croupier':
				balance -= betValue;
				break;
			default:
				balance = 0;
				break;
		}

		dispatch(
			setGameStats({
				coinsBalance: balance,
				winner: winner,
				croupierPoints: croupierPoints,
				playerPoints: playerPoints
			})
		);

		betPanelRef.current?.clearBetValue();
	};

	const getBestValueDependingOnCard = (
		value: string,
		currentPoints: number
	): number => {
		switch (value) {
			case 'ACE': {
				if (currentPoints === 0) {
					return 11;
				}
				return currentPoints + 11 > 21 ? 1 : 11;
			}
			case 'KING':
			case 'QUEEN':
			case 'JACK':
				return 10;
			default:
				return Number(value);
		}
	};

	return (
		<>
			<div className="na-p-page space-y-5">
				<h1 className="na-title">Black jack</h1>
				<section className="flex gap-3">
					<div className="w-1/4 gap-3 flex-col flex">
						{winner && (
							<div className="bg-pistachio text-center font-bold text-green-dark rounded p-3 space-y-3">
								<h5 className="text-xl">
									{winnerStatusDescription[winner].title}
								</h5>
								<p>{winnerStatusDescription[winner].description}</p>
								<div className="flex justify-center">
									<Button
										className="max-w-max"
										size="small"
										onClick={() => {
											setErrorModalVisible(false);
											void startGame();
										}}
									>
										Restart game
									</Button>
								</div>
							</div>
						)}

						<div className="bg-pistachio text-center font-bold text-green-dark rounded p-3 space-y-3">
							<h5 className="text-xl">Game stats</h5>
							{gamesStats.map((data, index) => (
								<div className="flex gap-1" key={index}>
									<p>{data.winner}</p>
									<p>
										{data.croupierPoints} - {data.playerPoints}
									</p>
									<p>{data.coinsBalance}</p>
								</div>
							))}
						</div>

						<Button
							className="max-w-max"
							onClick={startGame}
							disabled={winner === null}
						>
							Start Game
						</Button>
						<Button
							className="max-w-max"
							onClick={() => setErrorModalVisible(true)}
						>
							Add
						</Button>
						<div>deck_id = {deckId}</div>
						<div>{remainingCards}</div>
						<div>winner {winner}</div>
					</div>
					<div className="w-full gap-5 flex flex-col items-center">
						<PlayerBoard playerName="Croupier" points={croupierCards.points}>
							{croupierCards.cards.map((card, index) => (
								<Card key={index} src={card?.image} value={card?.value} />
							))}
						</PlayerBoard>
						<PlayerBoard playerName="Player" points={userCards.points}>
							{userCards.cards.map((card, index) => (
								<Card key={index} src={card?.image} value={card?.value} />
							))}
						</PlayerBoard>

						<BetPanel ref={betPanelRef} userPoints={userCards.coins} />

						<div className="flex gap-3 justify-center">
							<Button
								className="max-w-max"
								onClick={standGame}
								disabled={winner !== null}
							>
								Stand
							</Button>
							<Button
								className="max-w-max"
								onClick={hitCard}
								disabled={winner !== null}
							>
								Hit
							</Button>
						</div>
					</div>
				</section>
			</div>

			{errorModalVisible && (
				<Modal>
					<div className="m-3 w-full max-w-screen-sm">
						<div className="relative rounded-xl bg-pistachio p-5">
							<div className="absolute top-3 right-3">
								<button
									onClick={() => setErrorModalVisible(false)}
									className="flex items-center justify-center p-1"
								>
									<XMarkIcon className="h-5 w-5 text-orange" />
								</button>
							</div>
							<h2 className="text-xl font-bold text-orange md:text-3xl">
								Error
							</h2>
							<p className="text-green-dark mt-3 mb-5">
								Something went wrong! Try again.
							</p>
							<div className="flex justify-center">
								<Button
									className="max-w-max"
									onClick={() => {
										setErrorModalVisible(false);
										void startGame();
									}}
								>
									Restart game
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

BlackJackPage.layoutType = 'full';
export default BlackJackPage;
