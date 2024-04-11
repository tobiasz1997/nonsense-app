import { useEffect, useMemo, useState } from 'react';

const useIsMobile = (threshold: number = 640) => {
	const [isMobile, setIsMobile] = useState<boolean>();

	useEffect(() => {
		function handleResize() {
			window.innerWidth >= threshold
				? isMobile && setIsMobile(false)
				: !isMobile && setIsMobile(true);
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile, threshold]);

	return useMemo(() => {
		return isMobile;
	}, [isMobile]);
};

export default useIsMobile;
