import Avatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Popup from '@components/ui/Popup';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function UserPanel() {
	const t = useTranslations('account');
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { data: session, status } = useSession();
	const isAuthenticated = status === 'authenticated';

	useEffect(() => {
		const handleRouteChange = () => setIsOpen(false);
		router.events.on('routeChangeStart', handleRouteChange);
		return () => router.events.off('routeChangeStart', handleRouteChange);
	}, [router.events]);

	const handleOpenChange = (open: boolean) => {
		setHasError(false);
		setIsOpen(open);
	};

	const handleSignIn = async () => {
		setHasError(false);
		try {
			await router.push(
				`/login?callbackUrl=${encodeURIComponent(router.asPath ?? '/')}`
			);
		} catch {
			setHasError(true);
		}
	};

	const handleSignOut = async () => {
		setHasError(false);
		try {
			await signOut({ callbackUrl: '/' });
		} catch {
			setHasError(true);
		}
	};

	return (
		<Popup
			isOpen={isOpen}
			onOpenChange={handleOpenChange}
			className="ml-3 shrink-0 self-center"
			contentClassName="w-60 max-w-[calc(100vw-5rem)] space-y-4"
			trigger={(triggerProps) => (
				<Button
					{...triggerProps}
					type="button"
					variant="secondary"
					size="fit"
					className="w-9! h-9! p-2 border dark:border-0"
					aria-label={t('title')}
					disabled={status === 'loading'}
					submitting={status === 'loading'}
				>
					<Avatar
						name={isAuthenticated ? session?.user?.name : undefined}
						email={isAuthenticated ? session?.user?.email : undefined}
						size="small"
					/>
				</Button>
			)}
		>
			{isAuthenticated && (
				<div className="flex flex-col items-center gap-2 text-center">
					<Avatar
						name={session?.user?.name}
						email={session?.user?.email}
						className="bg-green-dark text-pistachio"
					/>
					<p className="w-full break-words font-bold">
						{session?.user?.name || session?.user?.email || t('signedIn')}
					</p>
				</div>
			)}
			<Button
				type="button"
				onClick={isAuthenticated ? handleSignOut : handleSignIn}
			>
				{t(isAuthenticated ? 'signOut' : 'signIn')}
			</Button>
			{hasError && <p role="alert">{t('actionError')}</p>}
		</Popup>
	);
}
