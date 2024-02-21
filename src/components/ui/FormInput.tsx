import cx from 'classnames';
import {
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes
} from 'react';
import FormErrorMessage from '@components/ui/FormErrorMessage';
import FormLabel from '@components/ui/FormLabel';

export type InputProps = {
	label?: string;
	error?: string;
};

const FormInput: ForwardRefRenderFunction<
	HTMLInputElement,
	InputProps & InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
	return (
		<div>
			<label
				className={cx(
					'flex cursor-pointer items-center overflow-hidden rounded border focus-within:ring-4',
					props.error
						? 'border-red text-red focus-within:ring-red/10'
						: 'border-green-dark text-green-dark focus-within:ring-yellow'
				)}
			>
				<span className="relative w-full">
					{props.label && (
						<span className="absolute top-1 left-3">
							<FormLabel required={props.required}>{props.label}</FormLabel>
						</span>
					)}
					<input
						{...props}
						ref={ref}
						className={cx(
							'h-12 w-full border-none focus:outline-none focus:ring-0 disabled:opacity-50',
							props.label ? 'px-3 pb-2 pt-4' : 'p-2'
						)}
					/>
				</span>
			</label>
			{props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
		</div>
	);
};

export default forwardRef(FormInput);
