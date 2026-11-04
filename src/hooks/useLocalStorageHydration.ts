import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '@store/store';
import { localStorageGet } from '@utils/localStorage';
import { useEffect } from 'react';

export const useLocalStorageHydration = <T>(
	storageKey: string,
	action: ActionCreatorWithPayload<T>
) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const data = localStorageGet<T>(storageKey);

		if (Array.isArray(data)) {
			dispatch(action(data));
		}
	}, [dispatch, storageKey, action]);
};
