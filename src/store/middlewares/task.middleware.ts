import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
	addTask,
	deleteTask,
	reorderTasks,
	setTaskStatus,
	sortTasks
} from '@store/slices/tasks.slice';
import { RootState } from '@store/store';
import { localStorageSet } from '@utils/localStorage';
import { TASKS_KEY } from '../../const/storageKeys.const';

const taskListenerMiddleware = createListenerMiddleware();

taskListenerMiddleware.startListening({
	matcher: isAnyOf(addTask, setTaskStatus, deleteTask, reorderTasks, sortTasks),
	effect: (_, listenerApi) => {
		const state = listenerApi.getState() as RootState;

		localStorageSet(TASKS_KEY, state.tasksSlice.items);
	}
});

export const taskMiddleware = taskListenerMiddleware.middleware;
