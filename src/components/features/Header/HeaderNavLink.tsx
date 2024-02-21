import classNames from 'classnames';
import { LinkProps } from 'next/dist/client/link';
import Link from 'next/link';
import React, { FC } from 'react';

type Props = {
	title: string;
	icon: JSX.Element;
	isActive?: boolean;
};

const HeaderNavLink: FC<Props & LinkProps> = (props) => {
	return (
		<Link
			href={props.href}
			title={props.title}
			className={classNames(
				'flex items-center space-x-2 p-2 px-6 transition',
				props.isActive
					? 'bg-opacity-10 text-yellow'
					: 'text-orange text-opacity-80 hover:text-yellow'
			)}
			passHref
		>
			{React.cloneElement(
				props.icon,
				{
					className: 'w-5 h-5'
				},
				null
			)}
			<span className="text-sm font-bold">{props.title}</span>
		</Link>
	);
};

export default HeaderNavLink;
