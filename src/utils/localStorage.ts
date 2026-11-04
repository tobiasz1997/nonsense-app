export const localStorageSet = <T>(key: string, val: T) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(key, JSON.stringify(val));
	}
};

export const localStorageGet = <T>(key: string): T | null => {
	if (typeof window === 'undefined') {
		return null;
	}

	const value = window.localStorage.getItem(key);

	if (value === null) {
		return null;
	}

	try {
		return JSON.parse(value) as T;
	} catch {
		return null;
	}
};

export const localStorageRemove = (key: string) => {
	if (typeof window !== 'undefined') {
		return window.localStorage.removeItem(key);
	}
};
