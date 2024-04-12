export interface IShuffleCardsResponse {
	success: boolean;
	deck_id: string;
	shuffled: boolean;
	remaining: number;
}

export interface ICard {
	code: string;
	image: string;
	images: ICardImages;
	value: string;
	suit: string;
}

interface ICardImages {
	svg: string;
	png: string;
}

export interface IDrawCardsResponse {
	success: boolean;
	deck_id: string;
	cards: ICard[];
	remaining: number;
}

export interface IDrawCardsRequest {
	deckId: string;
	count: number;
}

export interface IGameData {
	points: number;
	cards: Array<ICard | null>;
	coins: number;
}

export interface IGamesStats {
	winner: winnerType;
	playerPoints: number;
	croupierPoints: number;
	coinsBalance: number;
}

export type winnerType = 'user' | 'croupier' | 'draw';
