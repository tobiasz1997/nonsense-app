import HeaderNavLink from '@components/features/Header/HeaderNavLink';
import ThemePanel from '@components/features/Header/ThemePanel';
import Button from '@components/ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useActivePage from '@hooks/useActivePage';
import usePortal from '@hooks/usePortal';
import { NavLinksType } from '@interfaces/navLinksType';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	navLinks: NavLinksType;
	onClose: () => void;
};

const HeaderMobileNav: FC<Props> = (props) => {
	const portal = usePortal();
	const isActive = useActivePage();

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	return portal
		? createPortal(
				<div className="fixed flex flex-col top-0 left-0 z-50 h-full w-full overflow-hidden bg-green-dark p-4">
					<div className="flex w-full justify-end">
						<Button
							className="max-w-max md:hidden p-2"
							size="fit"
							icon={<XMarkIcon />}
							onClick={props.onClose}
						/>
					</div>
					<div className="flex flex-col flex-1">
						<nav className="py-3 flex-1">
							{props.navLinks.map((link, index) => (
								<HeaderNavLink
									key={index}
									href={link.path}
									icon={link.icon}
									title={link.title}
									isActive={isActive(link.path)}
								/>
							))}
						</nav>
						<div className="flex w-full justify-start">
							<ThemePanel />
						</div>
					</div>
				</div>,
				portal
			)
		: null;
};

export default HeaderMobileNav;
