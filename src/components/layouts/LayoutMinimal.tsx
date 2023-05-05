import { FC, PropsWithChildren } from 'react';
import HeaderMinimal from '@components/features/Header/HeaderMinimal';
import Footer from '@components/features/Footer/Footer';

const LayoutMinimal: FC<PropsWithChildren> = (props) => {
	return (
		<div className="flex min-h-screen flex-col">
			<HeaderMinimal />
			<main className="flex flex-1 flex-col bg-beige dark:bg-zinc-700">
				{props.children}
			</main>
			<Footer />
		</div>
	);
};

export default LayoutMinimal;
