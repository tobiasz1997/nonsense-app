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
	isSubmitting?: boolean;
};
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement> & Props> = (props) => {
	const [isPending, setIsPending] = useState(false);

	const sizes: Record<sizeType, string> = {
		small: 'h-9 text-sm rounded',
		default: 'h-12 rounded'
	};

	const variants: Record<variantType, string> = {
		primary:
			'text-yellow bg-green-dark hover:bg-green-dark/[0.7] hover:shadow-xl focus:ring-green font-bold px-3',
		secondary:
			'text-green-dark bg-pistachio hover:bg-pistachio/[0.7] hover:shadow-xl focus:ring-yellow font-bold px-3',
		tertiary:
			'text-black bg-orange hover:bg-orange/[0.7] hover:shadow-xl focus:ring-green font-bold px-3'
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
			disabled={props.disabled || isPending || props.isSubmitting}
		>
			{
				<>
					<Spinner
						className={cx(
							'absolute h-2 w-6 fill-current',
							isPending || props.isSubmitting ? 'visible' : 'invisible'
						)}
					/>
					<span
						className={cx('flex h-full w-full items-center justify-center', {
							invisible: isPending || props.isSubmitting
						})}
					>
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

type sizeType = 'default' | 'small';
type variantType = 'primary' | 'secondary' | 'tertiary';

export default Button;
