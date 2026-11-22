import type { ReactNode } from 'react';
import { useKeyPress } from '@hooks/useKeyPress';
import { useOutsideInteraction } from '@hooks/useOutsideInteraction';
import classNames from 'classnames';
import { useEffect, useId, useRef } from 'react';

type TriggerProps = {
	'aria-expanded': boolean;
	'aria-controls': string | undefined;
	onClick: () => void;
};

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	trigger: (props: TriggerProps) => ReactNode;
	children: ReactNode;
	align?: 'left' | 'right';
	className?: string;
	contentClassName?: string;
};

const FOCUSABLE_SELECTOR =
	'button:not(:disabled), a[href], input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

export default function Popup({
	isOpen,
	onOpenChange,
	trigger,
	children,
	align = 'right',
	className,
	contentClassName
}: Props) {
	const popupId = useId();
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useKeyPress('Escape', (event) => {
		if (!isOpen) {
			return;
		}
		event.preventDefault();
		onOpenChange(false);
		containerRef.current
			?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
			?.focus();
	});

	useOutsideInteraction(containerRef, () => onOpenChange(false), {
		enabled: isOpen
	});

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const target =
			contentRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
		(target ?? contentRef.current)?.focus();
	}, [isOpen]);

	return (
		<div ref={containerRef} className={classNames('relative', className)}>
			{trigger({
				'aria-expanded': isOpen,
				'aria-controls': isOpen ? popupId : undefined,
				onClick: () => onOpenChange(!isOpen)
			})}
			{isOpen && (
				<div
					ref={contentRef}
					id={popupId}
					tabIndex={-1}
					className={classNames(
						'absolute top-full z-60 mt-2 rounded-xl border border-green-dark/20 bg-pistachio p-4 text-green-dark shadow-xl dark:border-pistachio/20 dark:bg-zinc-800 dark:text-pistachio',
						align === 'right' ? 'right-0' : 'left-0',
						contentClassName
					)}
				>
					{children}
				</div>
			)}
		</div>
	);
}
