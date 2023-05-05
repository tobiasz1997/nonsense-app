import { useCallback } from 'react';

const useLocalStorage = () => {
	const set = useCallback(localStorageSet, []);
	const get = useCallback(localStorageGet, []);
	const remove = useCallback(localStorageRemove, []);

	return { set, get, remove };
};

export default useLocalStorage;

const localStorageSet = (key: string, val: string) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(key, val);
	}
};

const localStorageGet = (key: string) => {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(key);
	}
};

const localStorageRemove = (key: string) => {
	if (typeof window !== 'undefined') {
		return window.localStorage.removeItem(key);
	}
};
