import FormErrorMessage from '@components/ui/FormErrorMessage';
import FormLabel from '@components/ui/FormLabel';
import cx from 'classnames';
import {
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes
} from 'react';

export type TextareaProps = {
	label?: string;
	rows?: number;
	error?: string;
};

const FormTextarea: ForwardRefRenderFunction<
	HTMLTextAreaElement,
	TextareaProps & InputHTMLAttributes<HTMLTextAreaElement>
> = (props, ref) => {
	return (
		<div>
			<label
				className={cx(
					'flex cursor-pointer bg-white items-center overflow-hidden rounded border focus-within:ring-4',
					props.error
						? 'border-red text-red focus-within:ring-red/10'
						: 'border-green-dark text-green-dark focus-within:ring-yellow',
					props.disabled ? 'opacity-50' : ''
				)}
			>
				<span className="relative w-full">
					{props.label && (
						<span className={cx('absolute top-1 left-3 bg-white')}>
							<FormLabel required={props.required}>{props.label}</FormLabel>
						</span>
					)}
					<textarea
						{...props}
						ref={ref}
						rows={props.rows ?? 3}
						className={cx(
							'w-full border-none focus:outline-none focus:ring-0 disabled:opacity-50',
							props.label ? 'px-3 pb-2 pt-4' : 'p-3'
						)}
					/>
				</span>
			</label>
			{props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
		</div>
	);
};

export default forwardRef(FormTextarea);
