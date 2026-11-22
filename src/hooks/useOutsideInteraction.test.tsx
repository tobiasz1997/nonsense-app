import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { createRef } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideInteraction } from './useOutsideInteraction';

describe('useOutsideInteraction', () => {
	it('ignores interactions in a target and its descendants', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(
			<div ref={ref}>
				<button>Inside</button>
			</div>
		);
		renderHook(() => useOutsideInteraction(ref, onOutside));
		fireEvent.pointerDown(screen.getByRole('button', { name: 'Inside' }));
		fireEvent.focusIn(screen.getByRole('button', { name: 'Inside' }));
		expect(onOutside).not.toHaveBeenCalled();
	});

	it.each(['pointerdown', 'focusin'])('reports an outside %s event', (type) => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(<div ref={ref} />);
		renderHook(() => useOutsideInteraction(ref, onOutside));
		const event = new Event(type, { bubbles: true });
		fireEvent(document.body, event);
		expect(onOutside).toHaveBeenCalledWith(event);
	});

	it('treats a trigger and portaled content as inside', () => {
		const triggerRef = createRef<HTMLButtonElement>();
		const contentRef = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(
			<>
				<button ref={triggerRef}>Trigger</button>
				{createPortal(<div ref={contentRef}>Content</div>, document.body)}
			</>
		);
		renderHook(() =>
			useOutsideInteraction([triggerRef, contentRef], onOutside)
		);
		fireEvent.pointerDown(screen.getByRole('button', { name: 'Trigger' }));
		fireEvent.pointerDown(screen.getByText('Content'));
		expect(onOutside).not.toHaveBeenCalled();
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('subscribes only to the selected event types', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(<div ref={ref} />);
		renderHook(() =>
			useOutsideInteraction(ref, onOutside, { events: ['pointerdown'] })
		);
		fireEvent.focusIn(document.body);
		expect(onOutside).not.toHaveBeenCalled();
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('can subscribe only to focus changes', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(<div ref={ref} />);
		renderHook(() =>
			useOutsideInteraction(ref, onOutside, { events: ['focusin'] })
		);
		fireEvent.pointerDown(document.body);
		expect(onOutside).not.toHaveBeenCalled();
		fireEvent.focusIn(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('attaches and removes listeners when enabled changes', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(<div ref={ref} />);
		const { rerender } = renderHook(
			({ enabled }) => useOutsideInteraction(ref, onOutside, { enabled }),
			{ initialProps: { enabled: false } }
		);
		fireEvent.pointerDown(document.body);
		expect(onOutside).not.toHaveBeenCalled();
		rerender({ enabled: true });
		fireEvent.pointerDown(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
		rerender({ enabled: false });
		fireEvent.pointerDown(document.body);
		fireEvent.focusIn(document.body);
		expect(onOutside).toHaveBeenCalledTimes(1);
	});

	it('uses the latest callback without retaining the previous one', () => {
		const ref = createRef<HTMLDivElement>();
		const first = vi.fn();
		const latest = vi.fn();
		render(<div ref={ref} />);
		const { rerender } = renderHook(
			({ callback }) => useOutsideInteraction(ref, callback),
			{ initialProps: { callback: first } }
		);
		rerender({ callback: latest });
		fireEvent.pointerDown(document.body);
		expect(first).not.toHaveBeenCalled();
		expect(latest).toHaveBeenCalledTimes(1);
	});

	it('ignores events when all refs are unmounted', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		renderHook(() => useOutsideInteraction(ref, onOutside));
		fireEvent.pointerDown(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});

	it('removes listeners on unmount', () => {
		const ref = createRef<HTMLDivElement>();
		const onOutside = vi.fn();
		render(<div ref={ref} />);
		const { unmount } = renderHook(() => useOutsideInteraction(ref, onOutside));
		unmount();
		fireEvent.pointerDown(document.body);
		fireEvent.focusIn(document.body);
		expect(onOutside).not.toHaveBeenCalled();
	});
});
