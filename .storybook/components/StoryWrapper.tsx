import type { PropsWithChildren } from 'react';
import cx from 'classnames';

type StoryWrapperProps = PropsWithChildren<{
	className?: string;
}>;

export function StoryWrapper({ children, className }: StoryWrapperProps) {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-6">
			<div className={cx('w-full', className)}>{children}</div>
		</div>
	);
}
