import cx from 'classnames';
import delay from 'delay';
import {
	ButtonHTMLAttributes,
	cloneElement,
	FC,
	MouseEventHandler,
	ReactElement,
	useState
} from 'react';
import Spinner from '@components/ui/Spinner';

type Props = {
	size?: sizeType;
	variant?: variantType;
	icon?: ReactElement;
	submitting?: boolean;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
	const [isPending, setIsPending] = useState(false);

	const sizes: Record<sizeType, string> = {
		small: 'h-9 text-sm px-3 rounded',
		default: 'h-12 px-3 rounded',
		fit: 'rounded'
	};

	const iconSizes: Record<sizeType, string> = {
		small: 'w-4 h-4',
		default: 'w-6 h-6',
		fit: 'h-5 w-5'
	};

	const variants: Record<variantType, string> = {
		primary:
			'text-yellow bg-green-dark hover:bg-green-dark/[0.7] hover:shadow-xl focus:ring-green font-bold',
		secondary:
			'text-green-dark bg-pistachio hover:bg-pistachio/[0.7] hover:shadow-xl focus:ring-green font-bold',
		tertiary:
			'text-black bg-orange hover:bg-orange/[0.7] hover:shadow-xl focus:ring-yellow-light font-bold',
		quaternary:
			'text-green-dark bg-yellow hover:bg-yellow/[.7] hover:shadow-xl focus:ring-orange font-bold',
		delete:
			'text-white bg-red hover:bg-red/[.7] hover:shadow-xl focus:ring-orange font-bold'
	};

	const getIsPromise = (res: any) => res && typeof res.then === 'function';

	const _onClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
		const res = props.onClick && props.onClick(evt);

		if (getIsPromise(res)) {
			setIsPending(true);
			Promise.allSettled([delay(250), res]).finally(() => {
				setIsPending(false);
				return res;
			});
			return res;
		}
	};

	return (
		<button
			{...props}
			onClick={_onClick}
			className={cx(
				'relative flex w-full items-center justify-center whitespace-nowrap transition focus:outline-none focus:ring-4 disabled:opacity-50',
				props.className,
				sizes[props.size ?? 'default'],
				variants[props.variant ?? 'primary']
			)}
			type={props.type}
			disabled={props.disabled || isPending || props.submitting}
		>
			{
				<>
					<Spinner
						className={cx(
							'absolute h-2 w-6 fill-current',
							isPending || props.submitting ? 'visible' : 'invisible'
						)}
					/>
					<span
						className={cx('flex h-full w-full items-center justify-center', {
							invisible: isPending || props.submitting
						})}
					>
						{props.icon ? (
							<>
								<span className="flex shrink-0 items-center justify-center fill-current">
									{cloneElement(
										props.icon,
										{
											className: cx(iconSizes[props.size ?? 'default'])
										},
										null
									)}
								</span>
								<span
									className={cx('flex w-full justify-center', {
										'pl-3': props.icon && props.children
									})}
								>
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

type sizeType = 'default' | 'small' | 'fit';
type variantType =
	| 'primary'
	| 'secondary'
	| 'tertiary'
	| 'quaternary'
	| 'delete';

export default Button;
