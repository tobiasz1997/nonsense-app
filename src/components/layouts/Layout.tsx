import { FC, PropsWithChildren } from 'react';
import LayoutFull from '@components/layouts/LayoutFull';
import LayoutMinimal from '@components/layouts/LayoutMinimal';
import { LayoutType } from '@interfaces/layoutType';

type Props = {
	layoutType?: LayoutType;
};

const Layout: FC<PropsWithChildren<Props>> = (props) => {
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

	return <>{layout()}</>;
};

export default Layout;
