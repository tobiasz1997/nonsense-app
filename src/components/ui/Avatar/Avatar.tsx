import { UserIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

type Props = {
	name?: string | null;
	email?: string | null;
	size?: 'small' | 'default';
	className?: string;
};

export default function Avatar({
	name,
	email,
	size = 'default',
	className
}: Props) {
	const initials = getInitials(name, email);
	return (
		<span
			className={classNames(
				'inline-flex shrink-0 items-center justify-center rounded-full font-bold',
				size === 'small' ? 'h-6 w-6 text-sm' : 'h-12 w-12 text-base',
				className
			)}
		>
			{initials || (
				<UserIcon
					className={size === 'small' ? 'h-5 w-5' : 'h-6 w-6'}
					aria-hidden="true"
				/>
			)}
		</span>
	);
}

function getInitials(name?: string | null, email?: string | null): string {
	const parts = (name?.trim() || email?.split('@')[0] || '')
		.split(/[\s._-]+/)
		.filter(Boolean);
	const first = Array.from(parts[0] ?? '')[0] ?? '';
	const last =
		parts.length > 1 ? (Array.from(parts[parts.length - 1])[0] ?? '') : '';
	return `${first}${last}`.toUpperCase();
}
