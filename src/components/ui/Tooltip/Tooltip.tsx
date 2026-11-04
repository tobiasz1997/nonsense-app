import usePortal from '@hooks/usePortal';
import cx from 'classnames';
import {
	ReactNode,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import { createPortal } from 'react-dom';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
	children?: ReactNode;
	content?: ReactNode;
	placement?: TooltipPlacement | 'auto';
	gap?: number;
	className?: string;
};

type TooltipPosition = {
	top: number;
	left: number;
	placement: TooltipPlacement;
	ready: boolean;
};

const VIEWPORT_PADDING = 8;

const Tooltip = ({
	children,
	content,
	placement = 'auto',
	gap = 8,
	className
}: TooltipProps) => {
	const tooltipId = useId();

	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState<TooltipPosition>({
		top: 0,
		left: 0,
		placement: 'top',
		ready: false
	});

	const triggerRef = useRef<HTMLButtonElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const portalRoot = usePortal();

	const clearCloseTimeout = useCallback(() => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
	}, []);

	const open = useCallback(() => {
		clearCloseTimeout();

		setPosition((current) => ({
			...current,
			ready: false
		}));

		setIsOpen(true);
	}, [clearCloseTimeout]);

	const close = useCallback(() => {
		clearCloseTimeout();
		setIsOpen(false);
	}, [clearCloseTimeout]);

	const scheduleClose = useCallback(() => {
		clearCloseTimeout();

		closeTimeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 100);
	}, [clearCloseTimeout]);

	const toggle = useCallback(() => {
		clearCloseTimeout();

		setIsOpen((current) => {
			if (!current) {
				setPosition((position) => ({
					...position,
					ready: false
				}));
			}

			return !current;
		});
	}, [clearCloseTimeout]);

	const updatePosition = useCallback(() => {
		const trigger = triggerRef.current;
		const tooltip = tooltipRef.current;

		if (!trigger || !tooltip) {
			return;
		}

		const triggerRect = trigger.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();

		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		const availableSpace: Record<TooltipPlacement, number> = {
			top: triggerRect.top - gap - VIEWPORT_PADDING,
			bottom: viewportHeight - triggerRect.bottom - gap - VIEWPORT_PADDING,
			left: triggerRect.left - gap - VIEWPORT_PADDING,
			right: viewportWidth - triggerRect.right - gap - VIEWPORT_PADDING
		};

		const fits: Record<TooltipPlacement, boolean> = {
			top: availableSpace.top >= tooltipRect.height,
			bottom: availableSpace.bottom >= tooltipRect.height,
			left: availableSpace.left >= tooltipRect.width,
			right: availableSpace.right >= tooltipRect.width
		};

		const placements: TooltipPlacement[] = ['top', 'bottom', 'right', 'left'];

		let selectedPlacement: TooltipPlacement;

		if (placement === 'auto') {
			const fittingPlacements = placements.filter((item) => fits[item]);

			const options =
				fittingPlacements.length > 0 ? fittingPlacements : placements;

			selectedPlacement = options.reduce((best, current) =>
				availableSpace[current] > availableSpace[best] ? current : best
			);
		} else {
			const opposite: Record<TooltipPlacement, TooltipPlacement> = {
				top: 'bottom',
				bottom: 'top',
				left: 'right',
				right: 'left'
			};

			const orderedPlacements = [
				placement,
				opposite[placement],
				...placements.filter(
					(item) => item !== placement && item !== opposite[placement]
				)
			];

			selectedPlacement =
				orderedPlacements.find((item) => fits[item]) ??
				orderedPlacements.reduce((best, current) =>
					availableSpace[current] > availableSpace[best] ? current : best
				);
		}

		let top = 0;
		let left = 0;

		switch (selectedPlacement) {
			case 'top':
				top = triggerRect.top - tooltipRect.height - gap;
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				break;

			case 'bottom':
				top = triggerRect.bottom + gap;
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				break;

			case 'left':
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				left = triggerRect.left - tooltipRect.width - gap;
				break;

			case 'right':
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				left = triggerRect.right + gap;
				break;
		}

		left = Math.max(
			VIEWPORT_PADDING,
			Math.min(left, viewportWidth - tooltipRect.width - VIEWPORT_PADDING)
		);

		top = Math.max(
			VIEWPORT_PADDING,
			Math.min(top, viewportHeight - tooltipRect.height - VIEWPORT_PADDING)
		);

		setPosition({
			top,
			left,
			placement: selectedPlacement,
			ready: true
		});
	}, [gap, placement]);

	useLayoutEffect(() => {
		if (!isOpen) {
			return;
		}

		const frame = requestAnimationFrame(updatePosition);

		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);

		const resizeObserver = new ResizeObserver(updatePosition);

		if (tooltipRef.current) {
			resizeObserver.observe(tooltipRef.current);
		}

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition, true);
			resizeObserver.disconnect();
		};
	}, [isOpen, updatePosition]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target as Node;

			if (triggerRef.current?.contains(target)) {
				return;
			}
			if (tooltipRef.current?.contains(target)) {
				return;
			}

			close();
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				close();
			}
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [close, isOpen]);

	useEffect(() => {
		return clearCloseTimeout;
	}, [clearCloseTimeout]);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				className="inline-flex cursor-help border-0 bg-transparent p-0"
				aria-describedby={isOpen ? tooltipId : undefined}
				onMouseEnter={open}
				onMouseLeave={scheduleClose}
				onFocusCapture={open}
				onBlurCapture={scheduleClose}
				onClick={toggle}
			>
				{children}
			</button>

			{isOpen &&
				portalRoot &&
				createPortal(
					<div
						ref={tooltipRef}
						role="presentation"
						onMouseEnter={clearCloseTimeout}
						onMouseLeave={scheduleClose}
						style={{
							top: position.top,
							left: position.left,
							visibility: position.ready ? 'visible' : 'hidden',
							maxWidth: `calc(100vw - ${VIEWPORT_PADDING * 2}px)`,
							maxHeight: `calc(100vh - ${VIEWPORT_PADDING * 2}px)`
						}}
						className={cx(
							'fixed z-9999 w-max max-w-sm overflow-auto rounded-lg bg-green-dark px-3 py-2 text-xs sm:text-sm text-white shadow-lg',
							className
						)}
					>
						<div id={tooltipId} role="tooltip">
							{content}
						</div>
					</div>,
					document.body
				)}
		</>
	);
};

export default Tooltip;
