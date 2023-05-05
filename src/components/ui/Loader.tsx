import { FC } from 'react';
import Spinner from '@components/ui/Spinner';

type LoaderProps = {
	error?: unknown;
};

const Loader: FC<LoaderProps> = ({ error }) => {
	if (error) {
		throw error;
	}
	return (
		<div className="flex h-full w-full flex-1 items-center justify-center text-green-dark dark:text-pistachio">
			<Spinner className="h-3 fill-current" />
		</div>
	);
};

export default Loader;
