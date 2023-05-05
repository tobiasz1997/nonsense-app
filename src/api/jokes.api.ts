import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { fetcher } from '@utils/fetcher';

export interface IJoke {
	id: number;
	type: string;
	setup: string;
	punchline: string;
}

export const useGetJoke = (
	extraConfig?: SWRConfiguration<IJoke>
): SWRResponse<IJoke, Error> => {
	const url = 'https://official-joke-api.appspot.com/random_joke';

	return useSWR('api/jokes/getJokes', () => fetcher<IJoke>(url), extraConfig);
};
