import { SWRConfig, SWRConfiguration } from 'swr/_internal';
import { FC, PropsWithChildren } from 'react';

const SWRProvider: FC<PropsWithChildren> = (props) => {
	const SWRCfg: SWRConfiguration = {
		revalidateOnFocus: false
	};
	return <SWRConfig value={SWRCfg}>{props.children}</SWRConfig>;
};

export default SWRProvider;
