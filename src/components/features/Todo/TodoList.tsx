import React, { FC, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Reorder } from 'framer-motion';

import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '@store/store';
import { TaskFormType } from '@interfaces/taskFormType';
import {
	addTask,
	deleteTask,
	reorderTasks,
	setTaskStatus,
	sortTasks
} from '@store/slices/tasks.slice';
import { SelectOption } from '@interfaces/selectOption';
import { todoListSortByOptions } from '@interfaces/todoListSortByOptions';
import FormSelect from '@components/ui/FormSelect';
import TaskItem from '@components/features/Todo/TaskItem';
import Modal from '@components/ui/Modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AddTaskForm from '@components/features/Todo/AddTaskForm';

const TodoList: FC = () => {
	const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

	const tasks = useAppSelector((state) => state.tasksSlice.items);
	const dispatch = useAppDispatch();

	const handleAddTask = (payload: TaskFormType) => {
		dispatch(
			addTask({ id: uuidv4(), task: payload.task, createdAt: new Date() })
		);
		setIsAddTaskModalVisible(false);
	};

	const sortByOptionsList: SelectOption[] = [
		{
			label: 'Completed',
			value: 'completed' as todoListSortByOptions
		},
		{
			label: 'Not completed',
			value: 'notCompleted' as todoListSortByOptions
		},
		{
			label: 'Created Date',
			value: 'createdDate' as todoListSortByOptions
		}
	];

	return (
		<>
			<section className="space-y-5 rounded-xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500">
				<h2 className="text-xl font-bold text-orange sm:text-3xl">TODO</h2>
				<div className="flex items-center justify-between">
					<FormSelect
						placeholder={'Sort by'}
						options={sortByOptionsList}
						onChange={(e) =>
							dispatch(sortTasks(e.target.value as todoListSortByOptions))
						}
					/>
					<button
						onClick={() => setIsAddTaskModalVisible(true)}
						className="flex h-12 w-12 cursor-pointer items-center justify-between rounded bg-yellow p-3 text-green-dark shadow hover:bg-yellow/[.7] hover:shadow focus:outline-none focus:ring-2 focus:ring-green-dark"
					>
						<PlusIcon className="h-full w-full stroke-2" />
					</button>
				</div>
				<Reorder.Group
					className="space-y-5"
					axis="y"
					values={tasks}
					onReorder={(value) => dispatch(reorderTasks(value))}
				>
					{tasks.map((item) => (
						<TaskItem
							key={item.id}
							item={item}
							onStatusChange={(id) => dispatch(setTaskStatus(id))}
							onDelete={(id) => dispatch(deleteTask(id))}
						/>
					))}
				</Reorder.Group>
			</section>

			{isAddTaskModalVisible && (
				<Modal>
					<div className="m-3 w-full max-w-screen-sm">
						<div className="relative rounded-xl bg-pistachio p-5">
							<div className="absolute top-3 right-3">
								<button
									onClick={() => setIsAddTaskModalVisible(false)}
									className="flex items-center justify-center p-1"
								>
									<XMarkIcon className="h-5 w-5 text-orange" />
								</button>
							</div>
							<h2 className="text-xl font-bold text-orange md:text-3xl">
								Add task
							</h2>
							<AddTaskForm onSubmit={handleAddTask} />
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default TodoList;
