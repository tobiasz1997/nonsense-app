import { FC, PropsWithChildren } from 'react';
import Footer from '@components/features/Footer/Footer';
import HeaderFull from '@components/features/Header/HeaderFull';

const LayoutFull: FC<PropsWithChildren> = (props) => {
	return (
		<div className="flex min-h-screen flex-col bg-beige dark:bg-zinc-700">
			<HeaderFull />
			<main className="flex flex-1 flex-col">{props.children}</main>
			<Footer />
		</div>
	);
};

export default LayoutFull;
