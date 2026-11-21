import { AppPage } from '@interfaces/appPage';
import { useTranslations } from 'next-intl';

const NotesPage: AppPage = () => {
	const t = useTranslations('notes');

	return (
		<div className="na-p-page space-y-5">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h1 className="na-title">{t('title')}</h1>
			</div>
			<p>{t('empty')}</p>
		</div>
	);
};

export { requireAuth as getServerSideProps } from '@utils/auth';

NotesPage.layoutType = 'full';
export default NotesPage;
