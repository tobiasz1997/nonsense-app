import TodoList from '@components/features/Todo/TodoList';
import { AppPage } from '@interfaces/appPage';

const TasksPage: AppPage = () => {
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
