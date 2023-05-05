import { AppPage } from '@interfaces/appPage';
import TasksIdea from '@components/features/Todo/TasksIdea';
import TodoList from '@components/features/Todo/TodoList';

const TasksPage: AppPage = () => {
	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Tasks</h1>

			<section className="mx-auto max-w-screen-md">
				<TasksIdea />
			</section>

			<TodoList />
		</div>
	);
};

TasksPage.layoutType = 'full';
export default TasksPage;
