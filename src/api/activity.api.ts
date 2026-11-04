import { API_URLS } from '@api/api-urls.const';
import { fetcher } from '@utils/fetcher';
import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

export interface IActivity {
	activity: string;
	accessibility: number;
	type: string;
	participants: number;
	price: number;
	link: string;
	key: string;
}

export const useGetActivity = (
	extraConfig?: SWRConfiguration<IActivity>
): SWRResponse<IActivity, Error> => {
	return useSWR(
		'api/jokes/getActivity',
		() => fetcher<IActivity>(API_URLS.activity),
		extraConfig
	);
};
