import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

const HeaderMinimal: FC = () => {
	return (
		<header className="bg-pistachio p-4 drop-shadow-lg dark:bg-zinc-800">
			<div className="mx-auto flex max-w-max flex-1 items-center space-x-4 font-mukta">
				<h1 className="text-3xl font-bold text-green-dark dark:text-pistachio">
					Nonsense App
				</h1>
				<FaceSmileIcon className="h-8 w-8 rotate-180 dark:text-pistachio" />
			</div>
		</header>
	);
};

export default HeaderMinimal;
