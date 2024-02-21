import { FC, PropsWithChildren } from 'react';
import { SWRConfig, SWRConfiguration } from 'swr/_internal';

const SWRProvider: FC<PropsWithChildren> = (props) => {
	const SWRCfg: SWRConfiguration = {
		revalidateOnFocus: false
	};
	return <SWRConfig value={SWRCfg}>{props.children}</SWRConfig>;
};

export default SWRProvider;
