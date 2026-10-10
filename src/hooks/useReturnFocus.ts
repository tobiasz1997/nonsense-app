import { useEffect, useRef } from 'react';

export function useReturnFocus(isOpen: boolean) {
	const lastFocusedElement = useRef<HTMLElement | null>(null);
	const isOpenRef = useRef(isOpen);
	const wasOpenRef = useRef(isOpen);

	isOpenRef.current = isOpen;

	useEffect(() => {
		const handleFocus = (event: FocusEvent) => {
			if (isOpenRef.current) return;

			if (event.target instanceof HTMLElement) {
				lastFocusedElement.current = event.target;
			}
		};

		document.addEventListener('focusin', handleFocus);

		return () => {
			document.removeEventListener('focusin', handleFocus);
		};
	}, []);

	useEffect(() => {
		const wasOpen = wasOpenRef.current;

		if (wasOpen && !isOpen) {
			const element = lastFocusedElement.current;

			requestAnimationFrame(() => {
				if (element?.isConnected) {
					element.focus();
				}
			});
		}

		wasOpenRef.current = isOpen;
	}, [isOpen]);
}
