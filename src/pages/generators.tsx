import NipGenerator from '@components/features/Generators/NipGenerator';
import PeselGenerator from '@components/features/Generators/PeselGenerator';
import RegonGenerator from '@components/features/Generators/RegonGenerator';
import { AppPage } from '@interfaces/appPage';

const GeneratorsPage: AppPage = () => {
	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Generators</h1>

			<PeselGenerator />
			<NipGenerator />
			<RegonGenerator />
		</div>
	);
};
GeneratorsPage.layoutType = 'full';
export default GeneratorsPage;
