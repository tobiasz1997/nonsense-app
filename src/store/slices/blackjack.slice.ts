import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { drawCards, shuffleCards } from '@api/deck-of-cards.api';
import { IGameData, IGamesStats } from '@interfaces/blackjackType';
import { createSelector } from 'reselect';

type blackjackStateType = {
	userData: IGameData;
	croupierData: IGameData;
	deckId: string | null;
	gameStats: IGamesStats[];
	remainingCards: number;
	shuffleCardsStatus: 'idle' | 'loading' | 'error' | 'succeeded';
	drawCardsStatus: 'idle' | 'loading' | 'error' | 'succeeded';
};

const initialState: blackjackStateType = {
	userData: {
		cards: [],
		points: 0,
		coins: 2000
	},
	croupierData: {
		cards: [],
		points: 0,
		coins: 0
	},
	gameStats: [],
	deckId: null,
	remainingCards: 0,
	shuffleCardsStatus: 'idle',
	drawCardsStatus: 'idle'
};

const blackjackSlice = createSlice({
	name: 'blackjack',
	initialState: initialState,
	reducers: {
		setDeckInfo: (
			state,
			action: PayloadAction<{ deckId: string; remainingCards: number }>
		) => {
			state.deckId = action.payload.deckId;
			state.remainingCards = action.payload.remainingCards;
		},
		setCroupierData: (
			state,
			action: PayloadAction<Omit<IGameData, 'coins'>>
		) => {
			state.croupierData = {
				...state.croupierData,
				points: action.payload.points,
				cards: action.payload.cards
			};
		},
		setUserData: (state, action: PayloadAction<Omit<IGameData, 'coins'>>) => {
			state.userData = {
				...state.userData,
				points: action.payload.points,
				cards: action.payload.cards
			};
		},
		setGameStats: (state, action: PayloadAction<IGamesStats>) => {
			state.userData.coins = state.userData.coins + action.payload.coinsBalance;
			state.gameStats.push(action.payload);
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(shuffleCards.pending, (state) => {
				state.shuffleCardsStatus = 'loading';
			})
			.addCase(shuffleCards.fulfilled, (state, action) => {
				state.deckId = action.payload.deck_id;
				state.remainingCards = action.payload.remaining;
				state.shuffleCardsStatus = 'succeeded';
			})
			.addCase(shuffleCards.rejected, (state) => {
				state.shuffleCardsStatus = 'error';
			})
			.addCase(drawCards.pending, (state) => {
				state.drawCardsStatus = 'loading';
			})
			.addCase(drawCards.fulfilled, (state, action) => {
				state.remainingCards = action.payload.remaining;
				state.drawCardsStatus = 'succeeded';
			})
			.addCase(drawCards.rejected, (state) => {
				state.drawCardsStatus = 'error';
			});
	}
});

export const { setDeckInfo, setCroupierData, setUserData, setGameStats } =
	blackjackSlice.actions;

export default blackjackSlice.reducer;

export const initLoader = createSelector(
	[(state) => state.drawCardsStatus, (state) => state.remainingCards],
	(drawCardsStatus, remainingCards) =>
		drawCardsStatus === 'loading' &&
		(remainingCards === 52 || remainingCards === 0)
);
