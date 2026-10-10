import { API_URLS } from '@api/api-urls.const';
import {
	IDrawCardsRequest,
	IDrawCardsResponse,
	IShuffleCardsResponse
} from '@interfaces/blackjackType';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const shuffleCards = createAsyncThunk(
	'shuffleCards',
	async (): Promise<IShuffleCardsResponse> => {
		const response = await axios.get<IShuffleCardsResponse>(
			`${API_URLS.cards}/api/deck/new/shuffle/?deck_count=1`
		);
		return response.data;
	}
);

export const drawCards = createAsyncThunk(
	'drawCards',
	async (args: IDrawCardsRequest): Promise<IDrawCardsResponse> => {
		const response = await axios.get<IDrawCardsResponse>(
			`${API_URLS.cards}/api/deck/${args.deckId}/draw/?count=${args.count}`
		);
		return response.data;
	}
);
