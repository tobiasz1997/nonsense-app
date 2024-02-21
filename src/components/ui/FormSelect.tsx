import cx from 'classnames';
import {
	forwardRef,
	ForwardRefRenderFunction,
	SelectHTMLAttributes
} from 'react';
import FormErrorMessage from '@components/ui/FormErrorMessage';
import FormLabel from '@components/ui/FormLabel';
import { SelectOption } from '@interfaces/selectOption';

type Props = {
	label?: string;
	error?: string;
	options: SelectOption[];
};

const FormSelect: ForwardRefRenderFunction<
	HTMLSelectElement,
	Props & SelectHTMLAttributes<HTMLSelectElement>
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
					{props.label && props.label && (
						<span className="absolute top-1 left-3">
							<FormLabel required={props.required}>{props.label}</FormLabel>
						</span>
					)}

					<select
						{...props}
						ref={ref}
						className={cx(
							'h-12 w-full border-none pr-10 focus:outline-none focus:ring-0 disabled:opacity-50',
							props.label ? 'px-3 pb-2 pt-4' : 'p-2'
						)}
					>
						{props.options.map((option, index) => (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</span>
			</label>
			{props.error && <FormErrorMessage>{props.error}</FormErrorMessage>}
		</div>
	);
};

export default forwardRef(FormSelect);
