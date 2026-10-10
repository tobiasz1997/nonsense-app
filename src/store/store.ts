import { configureStore } from '@reduxjs/toolkit';
import { loggerMiddleware } from '@store/middlewares/logger.middleware';
import { taskMiddleware } from '@store/middlewares/task.middleware';
import blackjackSlice from '@store/slices/blackjack.slice';
import arraySlice from '@store/slices/generators/array.slice';
import nipSlice from '@store/slices/generators/nip.slice';
import regonSlice from '@store/slices/generators/regon.slice';
import stringSlice from '@store/slices/generators/string.slice';
import pickerWheelSlice from '@store/slices/pickerWheel.slice';
import tasksSlice from '@store/slices/tasks.slice';
import usersSlice from '@store/slices/users.slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import peselSlice from './slices/generators/pesel.slice';

const store = configureStore({
	reducer: {
		tasksSlice,
		usersSlice,
		blackjackSlice,
		regonSlice,
		peselSlice,
		nipSlice,
		arraySlice,
		stringSlice,
		pickerWheelSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false })
			.concat(loggerMiddleware)
			.prepend(taskMiddleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
