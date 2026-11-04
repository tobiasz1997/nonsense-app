import { API_URLS } from '@api/api-urls.const';
import { fetcher } from '@utils/fetcher';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export interface IJoke {
	id: number;
	type: string;
	setup: string;
	punchline: string;
}

export const useGetJoke = (
	extraConfig?: SWRConfiguration<IJoke>
): SWRResponse<IJoke, Error> => {
	return useSWR(
		'api/jokes/getJokes',
		() => fetcher<IJoke>(API_URLS.jokes),
		extraConfig
	);
};
