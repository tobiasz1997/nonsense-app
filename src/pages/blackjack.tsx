import { useRef, useState } from 'react';
import { drawCards, shuffleCards } from '@api/deck-of-cards.api';
import BetPanel, {
	BetPanelPropsRef
} from '@components/features/Blackjack/BetPanel';
import Card from '@components/features/Blackjack/Card';
import GameErrorModal from '@components/features/Blackjack/GameErrorModal';
import GameResultPanel from '@components/features/Blackjack/GameResultPanel';
import GameStatsPanel from '@components/features/Blackjack/GameStatsPanel';
import PlayerBoard from '@components/features/Blackjack/PlayerBoard';
import PlayerStatsPanel from '@components/features/Blackjack/PlayerStatsPanel';
import Button from '@components/ui/Button';
import Loader from '@components/ui/Loader';
import { AppPage } from '@interfaces/appPage';
import {
	IDrawCardsResponse,
	IShuffleCardsResponse,
	winnerType
} from '@interfaces/blackjackType';
import {
	initDrawCardsLoading,
	setCroupierData,
	setGameStats,
	setUserData
} from '@store/slices/blackjack.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

const BlackJackPage: AppPage = () => {
	const betPanelRef = useRef<BetPanelPropsRef>(null);
	const [winner, setWinner] = useState<winnerType | null>(null);
	const [errorModalVisible, setErrorModalVisible] = useState(true);
	const userCards = useAppSelector((state) => state.blackjackSlice.userData);
	const shuffleCardsStatus = useAppSelector(
		(state) => state.blackjackSlice.shuffleCardsStatus
	);
	const croupierCards = useAppSelector(
		(state) => state.blackjackSlice.croupierData
	);
	const deckId = useAppSelector((state) => state.blackjackSlice.deckId);
	const isInitDrawCardsLoading = useAppSelector((state) =>
		initDrawCardsLoading(state.blackjackSlice)
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
						{winner && <GameResultPanel />}
						<PlayerStatsPanel />
						<GameStatsPanel />
					</div>
					<div className="w-full gap-5 flex flex-col items-center">
						{shuffleCardsStatus !== 'idle' && (
							<>
								<PlayerBoard
									playerName="Croupier"
									points={croupierCards.points}
								>
									{isInitDrawCardsLoading && (
										<div className="h-39 w-25">
											<Loader />
										</div>
									)}
									{!isInitDrawCardsLoading &&
										croupierCards.cards.map((card, index) => (
											<Card key={index} src={card?.image} value={card?.value} />
										))}
								</PlayerBoard>
								<PlayerBoard playerName="Player" points={userCards.points}>
									{isInitDrawCardsLoading && (
										<div className="h-39 w-25">
											<Loader />
										</div>
									)}
									{!isInitDrawCardsLoading &&
										userCards.cards.map((card, index) => (
											<Card key={index} src={card?.image} value={card?.value} />
										))}
								</PlayerBoard>
							</>
						)}

						<BetPanel ref={betPanelRef} onStartGame={startGame} />

						<div className="flex gap-3 w-full">
							<Button
								variant="tertiary"
								onClick={doubleCard}
								disabled={winner !== null || userCards.cards.length > 2}
							>
								Double
							</Button>
							<Button
								variant="tertiary"
								onClick={hitCard}
								disabled={winner !== null}
							>
								Hit
							</Button>
							<Button onClick={standGame} disabled={winner !== null}>
								Stand
							</Button>
						</div>
					</div>
				</section>
			</div>

			{errorModalVisible && (
				<GameErrorModal
					onClose={() => {
						setErrorModalVisible(false);
					}}
					onRestart={() => {
						setErrorModalVisible(false);
						betPanelRef.current?.clearBetValue();
					}}
				/>
			)}
		</>
	);
};

BlackJackPage.layoutType = 'full';
export default BlackJackPage;
