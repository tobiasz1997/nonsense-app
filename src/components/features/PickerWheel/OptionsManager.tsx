import OptionsListItem from '@components/features/PickerWheel/OptionListItem';
import Button from '@components/ui/Button';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import { Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import {
	openManageOptionsFormModal,
	openManageOptionFormModal,
	showHideOptionSettings
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { FC, useMemo } from 'react';

const OptionsManager: FC = () => {
	const dispatch = useAppDispatch();

	const options = useAppSelector((state) => state.pickerWheelSlice.options);

	const activeOptions = useMemo(
		() => options.filter((option) => option.active),
		[options]
	);

	const inactiveOptions = useMemo(
		() => options.filter((option) => !option.active),
		[options]
	);
	return (
		<>
			<ExpansionPanel label="Settings" defaultOpen={true}>
				<div className="flex flex-wrap gap-4">
					<Button
						icon={<PencilSquareIcon />}
						className="flex-1"
						onClick={() => dispatch(openManageOptionsFormModal())}
					>
						Manage Options List
					</Button>
					<Button
						icon={<PlusIcon />}
						className="flex-1"
						onClick={() => dispatch(openManageOptionFormModal())}
					>
						Add Option
					</Button>
					<Button
						icon={<Cog8ToothIcon />}
						className="flex-1"
						onClick={() => dispatch(showHideOptionSettings())}
					>
						Option Settings
					</Button>
				</div>
			</ExpansionPanel>

			<div className="flex-1">
				<ExpansionPanel
					label={`Active (${activeOptions.length})`}
					defaultOpen={true}
				>
					<ul className="list-none flex flex-col gap-3 max-h-[500px] overflow-y-auto">
						{activeOptions.map((option) => (
							<OptionsListItem option={option} key={option.id} />
						))}
					</ul>
				</ExpansionPanel>

				<ExpansionPanel
					label={`Inactive (${inactiveOptions.length})`}
					defaultOpen={true}
				>
					<ul className="list-none flex flex-col gap-3 max-h-[500px] overflow-y-auto">
						{inactiveOptions.map((option) => (
							<OptionsListItem option={option} key={option.id} />
						))}
					</ul>
				</ExpansionPanel>
			</div>
		</>
	);
};

export default OptionsManager;
