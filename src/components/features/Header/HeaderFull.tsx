import { Bars3BottomRightIcon } from '@heroicons/react/20/solid';
import {
	CalculatorIcon,
	ClipboardDocumentListIcon,
	CpuChipIcon,
	FaceSmileIcon,
	HomeIcon,
	PuzzlePieceIcon,
	UserIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import HeaderMobileNav from '@components/features/Header/HeaderMobileNav';
import HeaderNavLink from '@components/features/Header/HeaderNavLink';
import ThemePanel from '@components/features/Header/ThemePanel';
import useActivePage from '@hooks/useActivePage';
import { NavLinksType } from '@interfaces/navLinksType';
import { appRoutes } from '@routes/app.routes';

const HeaderFull: FC = () => {
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const router = useRouter();

	const isActive = useActivePage();

	useEffect(() => {
		return () => {
			setIsMobileNavOpen(false);
		};
	}, [router]);

	return (
		<>
			<header className="drop-shadow-lg">
				<div className="flex bg-pistachio p-4 font-mukta dark:bg-zinc-800">
					<div className="relative flex flex-1 items-center space-x-1 md:justify-center md:space-x-4">
						<h1 className="text-xl font-bold text-green-dark dark:text-pistachio sm:text-3xl">
							Nonsense App
						</h1>
						<FaceSmileIcon className="h-6 w-6 rotate-180 dark:text-pistachio sm:h-8 sm:w-8" />
						<div className="absolute right-0 hidden md:block">
							<ThemePanel />
						</div>
					</div>
					<button
						onClick={() => setIsMobileNavOpen((prevState) => !prevState)}
						className="cursor-pointer rounded p-2 hover:shadow focus:outline-none focus:ring-2 focus:ring-green-dark dark:text-pistachio dark:focus:ring-pistachio md:hidden"
					>
						<Bars3BottomRightIcon className="h-6 w-6" />
					</button>
				</div>
				{isMobileNavOpen && (
					<HeaderMobileNav
						navLinks={navLinks}
						onClose={() => setIsMobileNavOpen((prevState) => !prevState)}
					/>
				)}
			</header>
			<header className="sticky top-0 z-50 hidden md:block">
				<nav className="flex h-full w-full justify-center bg-green-dark">
					{navLinks.map((link, index) => (
						<HeaderNavLink
							key={index}
							href={link.path}
							icon={link.icon}
							title={link.title}
							isActive={isActive(link.path)}
						/>
					))}
				</nav>
			</header>
		</>
	);
};

const navLinks: NavLinksType = [
	{
		...appRoutes.home,
		icon: <HomeIcon />
	},
	{
		...appRoutes.tasks,
		icon: <ClipboardDocumentListIcon />
	},
	{
		...appRoutes.algorithms,
		icon: <CalculatorIcon />
	},
	{
		...appRoutes.users,
		icon: <UserIcon />
	},
	{
		...appRoutes.generators,
		icon: <CpuChipIcon />
	},
	{
		...appRoutes.blackjack,
		icon: <PuzzlePieceIcon />
	}
];

export default HeaderFull;
