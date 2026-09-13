import FormErrorMessage from '@components/ui/FormErrorMessage';
import cx from 'classnames';
import {
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes
} from 'react';

export type InputProps = {
	dimension?: sizeType;
	className?: string;
	error?: string;
};

const FormInputColor: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps & InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
	const sizes: Record<sizeType, string> = {
		custom: '',
		small: 'h-9',
		default: 'h-12'
	};

	return (
		<div>
			<label
				className={cx(
					'flex cursor-pointer bg-white items-center overflow-hidden rounded border focus-within:ring-4 min-w-10',
					props.disabled ? 'opacity-50' : '',
					props.error
						? 'border-red text-red focus-within:ring-red/10'
						: 'border-green-dark text-green-dark focus-within:ring-yellow',
					props.className
				)}
			>
				<input
					{...props}
					ref={ref}
					type="color"
					className={cx(
						'w-full border-none focus:outline-none focus:ring-0 disabled:opacity-50',
						sizes[props.dimension ?? 'default']
					)}
				/>
			</label>
			{props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
		</div>
	);
};

type sizeType = 'default' | 'small' | 'custom';

export default forwardRef(FormInputColor);
