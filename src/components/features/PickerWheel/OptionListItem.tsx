import StarRating from '@components/features/PickerWheel/StarRating';
import Button from '@components/ui/Button';
import FormCheckbox from '@components/ui/FormCheckbox';
import FormInputColor from '@components/ui/FormInputColor';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { WheelOption } from '@interfaces/wheelOption';
import {
	deleteOption,
	manageOptionActive,
	openManageOptionFormModal,
	setColor,
	setStarRating
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import cx from 'classnames';
import React, { FC } from 'react';

type Props = {
	option: WheelOption;
};

const OptionsListItem: FC<Props> = ({ option }) => {
	const optionSettings = useAppSelector(
		(state) => state.pickerWheelSlice.optionSettings
	);

	const dispatch = useAppDispatch();

	return (
		<li key={option.id} className="flex gap-3">
			<FormCheckbox
				checked={option.active}
				onChange={() =>
					dispatch(
						manageOptionActive({
							active: !option.active,
							id: option.id
						})
					)
				}
			/>
			<div className="flex-1 flex flex-col gap-2">
				<div className="flex justify-between font-lg w-full capitalize line-clamp-3 text-green-dark dark:text-pistachio">
					<div
						className={cx(
							'w-full capitalize line-clamp-3',
							!option.active
								? 'line-through decoration-yellow decoration-2'
								: ''
						)}
					>
						{option.name}
					</div>
					{(option.stars ?? 0) > 0 && !optionSettings && (
						<div className="flex gap-2">
							<StarIconSolid className="h-6 w-6 dark:text-yellow-light text-yellow" />
							{option.stars}
						</div>
					)}
				</div>
				{optionSettings && (
					<div className="flex flex-col gap-2">
						<div className="flex gap-2 justify-between">
							<StarRating
								value={option.stars ?? 0}
								onChange={(star) =>
									dispatch(setStarRating({ star, id: option.id }))
								}
							/>
							<Button
								icon={<PencilSquareIcon />}
								className="max-w-max"
								size="small"
								onClick={() => dispatch(openManageOptionFormModal(option.id))}
							>
								Edit
							</Button>
						</div>
						<div className="flex gap-2 justify-between">
							<FormInputColor
								value={option.color}
								onChange={(event) =>
									dispatch(
										setColor({ color: event.target?.value, id: option.id })
									)
								}
								dimension="custom"
								className="h-[24px]"
							/>
							<Button
								icon={<TrashIcon />}
								className="max-w-max"
								size="small"
								variant="delete"
								onClick={() => dispatch(deleteOption(option.id))}
							>
								Delete
							</Button>
						</div>
					</div>
				)}
			</div>
		</li>
	);
};

export default OptionsListItem;
