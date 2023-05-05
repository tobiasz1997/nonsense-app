import { RocketLaunchIcon } from '@heroicons/react/20/solid';
import { useGetJoke } from '@api/jokes.api';
import { AppPage } from '@interfaces/appPage';
import Loader from '@components/ui/Loader';

const HomePage: AppPage = () => {
	const { data, error, isValidating } = useGetJoke();

	return !isValidating ? (
		data ? (
			<div className="na-p-page flex flex-1 flex-col items-center justify-center">
				<section className="max-w-screen-lg space-y-4 rounded-2xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500 sm:flex sm:space-x-8 sm:space-y-0">
					<div className="flex items-center justify-center">
						<RocketLaunchIcon className="h-10 w-10 text-orange" />
					</div>
					<div className="space-y-4 text-center text-base font-bold text-green-dark dark:text-pistachio sm:text-right sm:text-2xl">
						<p className="italic">{data.setup}</p>
						<p>{data.punchline}</p>
					</div>
				</section>
			</div>
		) : null
	) : (
		<Loader error={error} />
	);
};

HomePage.layoutType = 'full';
export default HomePage;
