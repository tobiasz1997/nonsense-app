import cx from 'classnames';
import React, {
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes
} from 'react';
import FormErrorMessage from '@components/ui/FormErrorMessage';

type FormCheckboxProps = {
	label: string;
	error?: string;
	type?: 'checkbox' | 'radio';
};

const FormCheckbox: ForwardRefRenderFunction<
	HTMLInputElement,
	FormCheckboxProps & InputHTMLAttributes<HTMLInputElement>
> = (props, ref) => {
	return (
		<div>
			<label className={cx('flex w-full cursor-pointer text-green-dark')}>
				<span
					className={cx(
						'relative flex h-6 w-6 shrink-0 items-center justify-center'
					)}
				>
					<input
						{...props}
						ref={ref}
						type={props.type ?? 'checkbox'}
						className={cx(
							'peer h-full w-full cursor-pointer rounded border border-green-dark checked:border-green-dark checked:bg-none checked:text-white checked:hover:border-green-dark focus:ring-4 focus:ring-yellow checked:focus:border-green-dark'
						)}
					/>
					<span
						className={cx(
							'absolute left-[4px] h-4 w-4 rounded-sm bg-green-dark opacity-0 transition duration-200 peer-checked:opacity-100'
						)}
					/>
				</span>

				<span className="ml-3 flex items-center text-xs md:text-base md:leading-5">
					{props.label}
					{props.required && (
						<span className="my-0.5 mx-1 h-1 w-1 rounded-full bg-red" />
					)}
				</span>
			</label>
			{props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
		</div>
	);
};

export default forwardRef(FormCheckbox);
