import ArrayGenerator from '@components/features/Generators/ArrayGenerator';
import NipGenerator from '@components/features/Generators/NipGenerator';
import PeselGenerator from '@components/features/Generators/PeselGenerator';
import RegonGenerator from '@components/features/Generators/RegonGenerator';
import StringGenerator from '@components/features/Generators/StringGenerator';
import { AppPage } from '@interfaces/appPage';
import { useTranslations } from 'next-intl';

const GeneratorsPage: AppPage = () => {
	const t = useTranslations('nav');

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">{t('generators')}</h1>

			<PeselGenerator />
			<NipGenerator />
			<RegonGenerator />
			<ArrayGenerator />
			<StringGenerator />
		</div>
	);
};
GeneratorsPage.layoutType = 'full';
export default GeneratorsPage;
