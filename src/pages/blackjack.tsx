import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { drawCards, shuffleCards } from '@api/deck-of-cards.api';
import BetPanel, {
	BetPanelPropsRef
} from '@components/features/Blackjack/BetPanel';
import Card from '@components/features/Blackjack/Card';
import GameResultPanel from '@components/features/Blackjack/GameResultPanel';
import GameStatsPanel from '@components/features/Blackjack/GameStatsPanel';
import PlayerBoard from '@components/features/Blackjack/PlayerBoard';
import Button from '@components/ui/Button';
import Loader from '@components/ui/Loader';
import Modal from '@components/ui/Modal';
import { AppPage } from '@interfaces/appPage';
import {
	IDrawCardsResponse,
	IShuffleCardsResponse,
	winnerType
} from '@interfaces/blackjackType';
import {
	initLoader,
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
	const isInitLoader = useAppSelector((state) =>
		initLoader(state.blackjackSlice)
	);
	const dispatch = useAppDispatch();

	const startGame = async () => {
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
				const croupierStartPoints = getBestValueDependingOnCard(
					typedResults.cards[0].value,
					0
				);
				dispatch(
					setCroupierData({
						points: croupierStartPoints,
						cards: [typedResults.cards[0], null]
					})
				);

				let playerStartPoints = 0;
				playerStartPoints += getBestValueDependingOnCard(
					typedResults.cards[1].value,
					0
				);
				playerStartPoints += getBestValueDependingOnCard(
					typedResults.cards[2].value,
					playerStartPoints
				);

				dispatch(
					setUserData({
						points: playerStartPoints,
						cards: [typedResults.cards[1], typedResults.cards[2]]
					})
				);

				if (playerStartPoints === 21) {
					finishGame('user', croupierCards.points, playerStartPoints);
				}
			}
		);
	};

	const hitCard = async (): Promise<boolean> => {
		if (!deckId) {
			setErrorModalVisible(true);
			return true;
		}

		const drawCardsResponse = await dispatch(
			drawCards({ deckId: deckId, count: 1 })
		);
		const drawCardsResponsePayload =
			drawCardsResponse.payload as IDrawCardsResponse;
		if (!drawCardsResponsePayload) {
			setErrorModalVisible(true);
			return true;
		}
		const points =
			userCards.points +
			getBestValueDependingOnCard(
				drawCardsResponsePayload.cards[0].value,
				userCards.points
			);
		dispatch(
			setUserData({
				points: points,
				cards: [...userCards.cards, drawCardsResponsePayload.cards[0]]
			})
		);
		if (points > 21) {
			finishGame('croupier', croupierCards.points, points);
			return true;
		}
		return false;
	};

	const standGame = async () => {
		if (!deckId) {
			setErrorModalVisible(true);
			return;
		}
		const drawCardsResponse = await dispatch(
			drawCards({ deckId: deckId, count: 10 })
		);
		const drawCardsResponsePayload =
			drawCardsResponse.payload as IDrawCardsResponse;
		if (!drawCardsResponsePayload) {
			setErrorModalVisible(true);
			return;
		}
		let points = croupierCards.points;
		let cards = [...croupierCards.cards.filter((x) => x !== null)];
		for (let result of drawCardsResponsePayload.cards) {
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
	};

	const doubleCard = async () => {
		betPanelRef.current?.doubleBet();
		const isQuit = await hitCard();
		!isQuit && (await standGame());
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
						<GameResultPanel
							winner={winner}
							onRestartGame={() => {
								setErrorModalVisible(false);
								void startGame();
							}}
						/>
						<GameStatsPanel />

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
					</div>
					<div className="w-full gap-5 flex flex-col items-center">
						<PlayerBoard playerName="Croupier" points={croupierCards.points}>
							{isInitLoader && (
								<div className="h-39 w-25">
									<Loader />
								</div>
							)}
							{!isInitLoader &&
								croupierCards.cards.map((card, index) => (
									<Card key={index} src={card?.image} value={card?.value} />
								))}
						</PlayerBoard>
						<PlayerBoard playerName="Player" points={userCards.points}>
							{isInitLoader && (
								<div className="h-39 w-25">
									<Loader />
								</div>
							)}
							{!isInitLoader &&
								userCards.cards.map((card, index) => (
									<Card key={index} src={card?.image} value={card?.value} />
								))}
						</PlayerBoard>

						<BetPanel
							ref={betPanelRef}
							userPoints={userCards.coins}
							onStartGame={startGame}
						/>

						<div className="flex gap-3 justify-center">
							<Button onClick={standGame} disabled={winner !== null}>
								Stand
							</Button>
							<Button onClick={hitCard} disabled={winner !== null}>
								Hit
							</Button>
							<Button onClick={doubleCard} disabled={winner !== null}>
								Double
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
										betPanelRef.current?.clearBetValue();
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
