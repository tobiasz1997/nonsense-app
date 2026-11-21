import type { GetServerSideProps } from 'next';
import Button from '@components/ui/Button';
import { AppPage } from '@interfaces/appPage';
import { appRoutes } from '@routes/app.routes';
import {
	getAuthorizedSession,
	getSafeCallbackUrl,
	isAuthConfigured
} from '@utils/auth';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {
	configured: boolean;
	error: 'denied' | 'failed' | null;
	callbackUrl: string;
};

const LoginPage: AppPage<Props> = ({ configured, error, callbackUrl }) => {
	const t = useTranslations('auth');
	const router = useRouter();
	const [hasError, setHasError] = useState(false);

	const handleSignIn = async () => {
		setHasError(false);
		try {
			await signIn('azure-ad', { callbackUrl });
		} catch {
			setHasError(true);
		}
	};

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">{t('title')}</h1>
			<section className="space-y-5 rounded-xl bg-pistachio p-5 shadow-xl dark:text-pistachio dark:bg-zinc-500 text-green-dark flex flex-col items-center">
				<p className="text-2xl font-bold">{t('description')}</p>
				{!configured && <output className="block">{t('notConfigured')}</output>}
				{(error || hasError) && (
					<p role="alert">{t(error === 'denied' ? 'denied' : 'failed')}</p>
				)}
				<Button
					className="max-w-max"
					icon={<Image src="/microsoft.svg" alt="" width={24} height={24} />}
					disabled={!configured}
					onClick={handleSignIn}
				>
					{t('signIn')}
				</Button>
				<p className="text-lg font-bold">or</p>
				<Button
					className="max-w-max"
					variant="secondary"
					onClick={() => router.push(appRoutes.home.path)}
				>
					{t('backHome')}
				</Button>
			</section>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
	req,
	res,
	query
}) => {
	res.setHeader('Cache-Control', 'private, no-store');
	const callbackUrl = getSafeCallbackUrl(query.callbackUrl);
	if (await getAuthorizedSession(req, res)) {
		return { redirect: { destination: callbackUrl, permanent: false } };
	}
	return {
		props: {
			configured: isAuthConfigured(),
			error:
				query.error === 'AccessDenied'
					? 'denied'
					: query.error
						? 'failed'
						: null,
			callbackUrl
		}
	};
};

LoginPage.layoutType = 'minimal';
export default LoginPage;
