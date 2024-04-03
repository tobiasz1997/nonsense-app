import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	IDrawCardsRequest,
	IDrawCardsResponse,
	IShuffleCardsResponse
} from '@interfaces/blackjackType';

export const shuffleCards = createAsyncThunk(
	'shuffleCards',
	async (): Promise<IShuffleCardsResponse> => {
		const response = await axios.get<IShuffleCardsResponse>(
			'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
		);
		return response.data;
	}
);

export const drawCards = createAsyncThunk(
	'drawCards',
	async (args: IDrawCardsRequest): Promise<IDrawCardsResponse> => {
		const response = await axios.get<IDrawCardsResponse>(
			`https://deckofcardsapi.com/api/deck/${args.deckId}/draw/?count=${args.count}`
		);
		return response.data;
	}
);
