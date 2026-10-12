import TodoList from '@components/features/Todo/TodoList';
import { useLocalStorageHydration } from '@hooks/useLocalStorageHydration';
import { AppPage } from '@interfaces/appPage';
import { TaskType } from '@interfaces/taskType';
import { addTasks } from '@store/slices/tasks.slice';
import { TASKS_KEY } from '../const/storageKeys.const';

const TasksPage: AppPage = () => {
	useLocalStorageHydration<TaskType[]>(TASKS_KEY, addTasks);

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Tasks</h1>

			{/*TODO: fix/replace api*/}
			{/*<section className="mx-auto max-w-(--breakpoint-md)">*/}
			{/*	<TasksIdea />*/}
			{/*</section>*/}

			<TodoList />
		</div>
	);
};

TasksPage.layoutType = 'full';
export default TasksPage;
