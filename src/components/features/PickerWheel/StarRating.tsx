import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import cx from 'classnames';
import React, { FC, useState } from 'react';

type Props = {
	value: number;
	onChange: (value: number) => void;
	disabled?: boolean;
};

const StarRating: FC<Props> = (props) => {
	const [hoverValue, setHoverValue] = useState<number>(0);

	const visibleValue = hoverValue || props.value;

	return (
		<div
			className="flex gap-1 items-center"
			onMouseLeave={() => setHoverValue(0)}
		>
			{[1, 2, 3].map((number) => {
				const isActive = number <= visibleValue;
				const disabled = props.disabled ?? false;

				return (
					<button
						key={number}
						type="button"
						onMouseEnter={() => {
							if (!disabled) setHoverValue(number);
						}}
						onClick={() => props.onChange(number === props.value ? 0 : number)}
						className={cx(
							'rounded p-0.5 transition',
							'focus:outline-none focus:ring-yellow focus:ring-2',
							disabled
								? 'cursor-not-allowed opacity-50'
								: 'cursor-pointer hover:scale-110'
						)}
					>
						{isActive ? (
							<StarIconSolid className="h-6 w-6 transition-colors dark:text-yellow-light text-yellow" />
						) : (
							<StarIconOutline className="h-6 w-6 transition-colors dark:text-pistachio text-green-dark" />
						)}
					</button>
				);
			})}
		</div>
	);
};

export default StarRating;
