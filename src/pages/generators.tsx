import { AppPage } from '@interfaces/appPage';
import PeselGenerator from '@components/features/Generators/PeselGenerator';

const GeneratorsPage: AppPage = () => {
	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Generators</h1>

			<PeselGenerator />
		</div>
	);
};
GeneratorsPage.layoutType = 'full';
export default GeneratorsPage;
