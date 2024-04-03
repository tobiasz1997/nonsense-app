import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import nipSlice from '@store/generators/nip.slice';
import peselSlice from '@store/generators/pesel.slice';
import regonSlice from '@store/generators/regon.slice';
import { loggerMiddleware } from '@store/middlewares';
import blackjackSlice from '@store/slices/blackjack.slice';
import tasksSlice from '@store/slices/tasks.slice';
import usersSlice from '@store/slices/users.slice';

const store = configureStore({
	reducer: {
		tasksSlice,
		usersSlice,
		blackjackSlice,
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
