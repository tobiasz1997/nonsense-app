import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useActivePage = () => {
	const router = useRouter();

	return useCallback(
		(path: string) => {
			if (router.asPath == '/' && path == '/') {
				return true;
			} else if (path != '/') {
				return router.asPath.includes(path);
			} else return false;
		},
		[router.asPath]
	);
};

export default useActivePage;
