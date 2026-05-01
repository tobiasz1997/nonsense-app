import Footer from '@components/features/Footer/Footer';
import HeaderFull from '@components/features/Header/HeaderFull';
import { FC, PropsWithChildren } from 'react';

const LayoutFull: FC<PropsWithChildren> = (props) => {
	return (
		<div className="flex min-h-screen flex-col na-background">
			<HeaderFull />
			<main className="flex flex-1 flex-col">{props.children}</main>
			<Footer />
		</div>
	);
};

export default LayoutFull;
