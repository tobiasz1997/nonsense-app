import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import HeaderNavLink from '@components/features/Header/HeaderNavLink';
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
						<button
							onClick={props.onClose}
							className="cursor-pointer rounded p-2 text-yellow hover:shadow focus:outline-none focus:ring-2 focus:ring-yellow"
						>
							<XMarkIcon className="h-6 w-6" />
						</button>
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
