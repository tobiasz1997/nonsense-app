import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import HeaderNavLink from '@components/features/Header/HeaderNavLink';
import Button from '@components/ui/Button';
import useActivePage from '@hooks/useActivePage';
import usePortal from '@hooks/usePortal';
import { NavLinksType } from '@interfaces/navLinksType';

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
				<div className="fixed top-0 left-0 z-50 h-full w-full overflow-hidden bg-green-dark p-4">
					<div className="flex w-full justify-end">
						<Button
							className="max-w-max md:hidden p-2"
							size="fit"
							icon={<XMarkIcon />}
							onClick={props.onClose}
						/>
					</div>
					<div>
						<nav className="py-3">
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
					</div>
				</div>,
				portal
			)
		: null;
};

export default HeaderMobileNav;
