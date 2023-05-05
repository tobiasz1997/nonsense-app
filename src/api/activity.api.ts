import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { fetcher } from '@utils/fetcher';

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
	const url = 'http://www.boredapi.com/api/activity/';

	return useSWR(
		'api/jokes/getActivity',
		() => fetcher<IActivity>(url),
		extraConfig
	);
};
