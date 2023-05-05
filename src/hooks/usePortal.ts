import { useEffect, useState } from 'react';

const usePortal = (): HTMLElement | null => {
	const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		const root = document.createElement('div');
		document.body.appendChild(root);
		setRootElement(root);

		return () => {
			root.remove();
			setRootElement(null);
		};
	}, []);

	return rootElement;
};

export default usePortal;
