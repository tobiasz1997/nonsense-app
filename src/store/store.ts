import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tasksSlice from '@store/slices/tasks.slice';
import { loggerMiddleware } from '@store/middlewares';
import usersSlice from '@store/slices/users.slice';
import regonSlice from '@store/generators/regon.slice';
import peselSlice from '@store/generators/pesel.slice';
import nipSlice from '@store/generators/nip.slice';

const store = configureStore({
	reducer: {
		tasksSlice,
		usersSlice,
		regonSlice,
		peselSlice,
		nipSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(loggerMiddleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
