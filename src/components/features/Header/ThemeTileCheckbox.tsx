import cx from 'classnames';
import {
	cloneElement,
	forwardRef,
	ForwardRefRenderFunction,
	InputHTMLAttributes,
	ReactElement
} from 'react';

type Props = {
	icon: ReactElement;
	styles: string;
};

const ThemeTileCheckbox: ForwardRefRenderFunction<
	HTMLInputElement,
	Props & InputHTMLAttributes<HTMLInputElement>
> = ({ icon, styles, ...props }, ref) => {
	return (
		// peer-checked:bg-teal  rounded border border-gray-200 peer-checked:text-white
		<label className="flex">
			<input {...props} ref={ref} type={'checkbox'} className="peer hidden" />

			<span
				className={cx('cursor-pointer bg-gray-200 p-1.5 text-gray-500', styles)}
			>
				{cloneElement(
					icon,
					{
						className: 'w-5 h-5 stroke-2'
					},
					null
				)}
			</span>
		</label>
	);
};

export default forwardRef(ThemeTileCheckbox);
