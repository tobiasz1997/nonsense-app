import { PlusIcon } from '@heroicons/react/24/solid';
import { Reorder } from 'framer-motion';
import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTaskForm from '@components/features/Todo/AddTaskForm';
import TaskItem from '@components/features/Todo/TaskItem';
import Button from '@components/ui/Button';
import FormSelect from '@components/ui/FormSelect';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { SelectOption } from '@interfaces/selectOption';
import { TaskFormType } from '@interfaces/taskFormType';
import { todoListSortByOptions } from '@interfaces/todoListSortByOptions';
import {
	addTask,
	deleteTask,
	reorderTasks,
	setTaskStatus,
	sortTasks
} from '@store/slices/tasks.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

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
						options={sortByOptionsList}
						onChange={(e) =>
							dispatch(sortTasks(e.target.value as todoListSortByOptions))
						}
					/>
					<Button
						className="max-w-max"
						variant="quaternary"
						icon={<PlusIcon />}
						onClick={() => setIsAddTaskModalVisible(true)}
					/>
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
					<ModalBox onClose={() => setIsAddTaskModalVisible(false)}>
						<h2 className="na-modal-title">Add task</h2>
						<AddTaskForm onSubmit={handleAddTask} />
					</ModalBox>
				</Modal>
			)}
		</>
	);
};

export default TodoList;
