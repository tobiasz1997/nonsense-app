import { TaskType } from '@interfaces/taskType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoListSortByOptions } from '@interfaces/todoListSortByOptions';

type tasksStateType = {
	items: TaskType[];
};

const initialState: tasksStateType = {
	items: [
		{
			id: 'eec4ab8a-00b1-46b6-ab88-07a546fa2581',
			task: '2222',
			done: false,
			createdAt: new Date('2023-03-05T18:41:38.553Z')
		},
		{
			id: '14261e8a-d764-4103-af13-5c235b2afdf9',
			task: '44444',
			done: false,
			createdAt: new Date('2023-03-05T18:41:45.031Z')
		},
		{
			id: 'f5ac9b90-60c1-4ba7-b5e7-81a246420cfa',
			task: '5555',
			done: true,
			createdAt: new Date('2023-03-05T18:41:49.454Z')
		}
	]
};

const todosSlice = createSlice({
	name: 'tasks',
	initialState: initialState,
	reducers: {
		addTask(state, action: PayloadAction<Omit<TaskType, 'done'>>) {
			state.items.push({
				id: action.payload.id,
				task: action.payload.task,
				done: false,
				createdAt: action.payload.createdAt
			});
		},
		setTaskStatus(state, action: PayloadAction<string>) {
			const task = state.items.find((x) => x.id === action.payload);
			if (task) {
				task.done = !task.done;
			}
		},
		deleteTask(state, action: PayloadAction<string>) {
			state.items = state.items.filter((x) => x.id !== action.payload);
		},
		reorderTasks(state, action: PayloadAction<TaskType[]>) {
			state.items = action.payload;
		},
		sortTasks(state, action: PayloadAction<todoListSortByOptions>) {
			switch (action.payload) {
				case 'completed': {
					state.items.sort((a, b) => Number(b.done) - Number(a.done));
					break;
				}
				case 'notCompleted': {
					state.items.sort((a, b) => Number(a.done) - Number(b.done));
					break;
				}
				case 'createdDate': {
					state.items.sort(
						(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
					);
					break;
				}
			}
		}
	}
});

export const { addTask, setTaskStatus, deleteTask, reorderTasks, sortTasks } =
	todosSlice.actions;

export default todosSlice.reducer;
