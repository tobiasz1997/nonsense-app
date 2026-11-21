import CurrencyRates from '@components/features/CurrencyRates/CurrencyRates';
import { AppPage } from '@interfaces/appPage';

const HomePage: AppPage = () => {
	return (
		<div className="na-p-page flex flex-1 flex-col items-center justify-center gap-8 relative">
			<CurrencyRates />
		</div>
	);
};

HomePage.layoutType = 'full';
export default HomePage;
