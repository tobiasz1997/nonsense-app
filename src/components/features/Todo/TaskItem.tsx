import { ArrowsUpDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import cx from 'classnames';
import { Reorder } from 'framer-motion';
import React, { FC } from 'react';
import { TaskType } from '@interfaces/taskType';

type Props = {
	item: TaskType;
	onStatusChange: (id: string) => void;
	onDelete: (id: string) => void;
};

const TaskItem: FC<Props> = (props) => {
	return (
		<Reorder.Item
			className={cx(
				'flex justify-between space-x-5 rounded-xl p-4 shadow',
				props.item.done ? 'bg-yellow/[.7]' : 'bg-yellow'
			)}
			value={props.item}
		>
			<label
				className="flex flex-1 cursor-pointer items-center pl-3"
				title={props.item.task}
			>
				<input
					type="checkbox"
					checked={props.item.done}
					onChange={() => props.onStatusChange(props.item.id)}
					className="h-6 w-6 rounded border border-green-dark checked:text-green-dark focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-green"
				/>
				<span
					className={cx(
						'font-lg ml-3 w-full capitalize line-clamp-3',
						props.item.done
							? 'text-green-dark/[.5] line-through decoration-pistachio decoration-2'
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
						className="cursor-pointer rounded text-red hover:text-red/[.5] focus:outline-none focus:ring-0"
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
