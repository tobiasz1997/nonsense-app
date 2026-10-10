import { useEffect, useRef } from 'react';

type KeyboardKey =
	| 'Escape'
	| 'Enter'
	| 'Tab'
	| ' '
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight';

export function useKeyPress(
	keys: KeyboardKey | KeyboardKey[],
	callback: (event: KeyboardEvent) => void
) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const allowedKeys = Array.isArray(keys) ? keys : [keys];

		const handleKeyDown = (event: KeyboardEvent) => {
			if (allowedKeys.includes(event.key as KeyboardKey)) {
				callbackRef.current(event);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [keys]);
}
