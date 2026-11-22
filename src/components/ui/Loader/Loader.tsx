import Spinner from '@components/ui/Spinner';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type LoaderProps = {
	error?: unknown;
};

const Loader: FC<LoaderProps> = ({ error }) => {
	const t = useTranslations('common');

	return (
		<div className="flex h-full w-full flex-1 items-center justify-center text-green-dark dark:text-pistachio">
			{error ? (
				<p role="alert">{t('unexpectedError')}</p>
			) : (
				<Spinner className="h-3 fill-current" />
			)}
		</div>
	);
};

export default Loader;
