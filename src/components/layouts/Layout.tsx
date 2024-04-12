import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useMemo } from 'react';
import LayoutFull from '@components/layouts/LayoutFull';
import LayoutMinimal from '@components/layouts/LayoutMinimal';
import { LayoutType } from '@interfaces/layoutType';
import { appRoutes } from '@routes/app.routes';

type Props = {
	layoutType?: LayoutType;
};

const Layout: FC<PropsWithChildren<Props>> = (props) => {
	const pathName = usePathname();
	const layout = () => {
		switch (props.layoutType) {
			case 'full':
				return <LayoutFull>{props.children}</LayoutFull>;
			case 'minimal':
				return <LayoutMinimal>{props.children}</LayoutMinimal>;
			default:
				return <>{props.children}</>;
		}
	};

	const pageTitle = useMemo(() => {
		return Object.values(appRoutes).find((x) => x.path === pathName)?.title;
	}, [pathName]);

	return (
		<>
			<Head>
				<title>Nonsense App - {pageTitle}</title>
			</Head>
			{layout()}
		</>
	);
};

export default Layout;
