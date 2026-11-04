import FormCheckbox from '@components/ui/FormCheckbox';
import { ArrowsUpDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TaskType } from '@interfaces/taskType';
import cx from 'classnames';
import { Reorder } from 'framer-motion';
import { FC } from 'react';

type Props = {
	item: TaskType;
	onStatusChange: (id: string) => void;
	onDelete: (id: string) => void;
};

const TaskItem: FC<Props> = (props) => {
	return (
		<Reorder.Item
			data-task-id={props.item.id}
			className={cx(
				'flex justify-between space-x-5 rounded-xl p-4 shadow',
				props.item.done ? 'bg-yellow/70' : 'bg-yellow'
			)}
			value={props.item}
		>
			<label
				className="flex flex-1 cursor-pointer items-center pl-3"
				title={props.item.task}
			>
				<FormCheckbox
					checked={props.item.done}
					onChange={() => props.onStatusChange(props.item.id)}
					secondaryringcolor="true"
				/>
				<span
					className={cx(
						'font-lg ml-3 w-full capitalize line-clamp-3',
						props.item.done
							? 'text-green-dark/50 line-through decoration-pistachio decoration-2'
							: ''
					)}
				>
					{props.item.task}
				</span>
			</label>
			<div className="flex items-center justify-center space-x-3">
				{props.item.done && (
					<button
						onClick={() => props.onDelete(props.item.id)}
						className="cursor-pointer rounded text-red hover:text-red/50 focus:outline-0 focus-within:ring-4 focus-within:ring-pistachio"
					>
						<TrashIcon className="h-6 w-6 stroke-2" />
					</button>
				)}
				<ArrowsUpDownIcon className="h-6 w-6 stroke-2 text-green-dark" />
			</div>
		</Reorder.Item>
	);
};

export default TaskItem;
