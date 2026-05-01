import { FC } from 'react';

const Footer: FC = () => {
	return (
		<footer className="bg-green-dark p-4 drop-shadow-lg">
			<div className="mx-auto max-w-max">
				<p className="text-sm font-bold text-yellow md:text-base">
					© 2023 - {new Date().getFullYear()} Grzegorz Tobiasz. All rights
					reserved. · v{process.env.NEXT_PUBLIC_APP_VERSION}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
