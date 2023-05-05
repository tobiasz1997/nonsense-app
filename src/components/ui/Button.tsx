import { ButtonHTMLAttributes, cloneElement, FC, ReactElement } from 'react';
import cx from 'classnames';

type Props = {
	size?: 'default' | 'small';
	variant?: 'primary' | 'secondary';
	icon?: ReactElement;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
	const sizes: Record<string, string> = {
		small: 'h-9 text-sm rounded',
		default: 'h-12 rounded'
	};

	const variants: Record<string, string> = {
		primary:
			'text-yellow bg-green-dark hover:bg-green-dark/[0.7] hover:shadow-xl focus:ring-green font-bold px-3',
		secondary:
			'text-green-dark bg-pistachio hover:bg-pistachio/[0.7] hover:shadow-xl focus:ring-yellow font-bold px-3'
	};

	return (
		<button
			{...props}
			className={cx(
				'relative flex w-full items-center justify-center whitespace-nowrap transition focus:outline-none focus:ring-4 disabled:opacity-50',
				props.className,
				sizes[props.size ?? 'default'],
				variants[props.variant ?? 'primary']
			)}
			type={props.type}
			disabled={props.disabled}
		>
			{
				<>
					<span className={'flex h-full w-full items-center justify-center'}>
						{props.icon ? (
							<>
								<span className="flex h-12 w-12 shrink-0 items-center justify-center fill-current px-3">
									{cloneElement(
										props.icon,
										{
											className: 'w-6 h-6'
										},
										null
									)}
								</span>
								<span className="-ml-12 flex w-full justify-center px-3">
									{props.children}
								</span>
							</>
						) : (
							<span>{props.children}</span>
						)}
					</span>
				</>
			}
		</button>
	);
};

export default Button;
