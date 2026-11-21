import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

type OutsideEvent = 'pointerdown' | 'focusin';
type TargetRefs = RefObject<Node | null> | readonly RefObject<Node | null>[];
type Options = {
	enabled?: boolean;
	events?: readonly OutsideEvent[];
};

const DEFAULT_EVENTS: readonly OutsideEvent[] = ['pointerdown', 'focusin'];

export function useOutsideInteraction(
	refs: TargetRefs,
	onOutside: (event: PointerEvent | FocusEvent) => void,
	{ enabled = true, events = DEFAULT_EVENTS }: Options = {}
) {
	const latestRef = useRef({ refs, onOutside });
	const listenPointerDown = events.includes('pointerdown');
	const listenFocusIn = events.includes('focusin');

	useEffect(() => {
		latestRef.current = { refs, onOutside };
	}, [refs, onOutside]);

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const handleOutside = (event: PointerEvent | FocusEvent) => {
			const target = event.target;
			if (!(target instanceof Node)) {
				return;
			}

			const currentRefs = latestRef.current.refs;
			const refList = 'current' in currentRefs ? [currentRefs] : currentRefs;
			const nodes = refList
				.map((ref) => ref.current)
				.filter((node): node is Node => node !== null);
			if (!nodes.length) {
				return;
			}

			const path = event.composedPath();
			if (nodes.some((node) => node.contains(target) || path.includes(node))) {
				return;
			}
			latestRef.current.onOutside(event);
		};

		if (listenPointerDown) {
			document.addEventListener('pointerdown', handleOutside);
		}
		if (listenFocusIn) {
			document.addEventListener('focusin', handleOutside);
		}
		return () => {
			if (listenPointerDown) {
				document.removeEventListener('pointerdown', handleOutside);
			}
			if (listenFocusIn) {
				document.removeEventListener('focusin', handleOutside);
			}
		};
	}, [enabled, listenPointerDown, listenFocusIn]);
}
