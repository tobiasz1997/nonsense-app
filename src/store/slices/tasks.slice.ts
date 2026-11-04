import { TaskType } from '@interfaces/taskType';
import { todoListSortByOptions } from '@interfaces/todoListSortByOptions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type tasksStateType = {
	items: TaskType[];
};

const initialState: tasksStateType = {
	items: []
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
		addTasks(state, action: PayloadAction<TaskType[]>) {
			state.items = action.payload;
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

export const {
	addTask,
	addTasks,
	setTaskStatus,
	deleteTask,
	reorderTasks,
	sortTasks
} = todosSlice.actions;

export default todosSlice.reducer;
