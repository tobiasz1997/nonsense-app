export const fetcher = async <T>(url: string): Promise<T> => {
	const res = await fetch(url);
	if (!res.ok) {
		throw Object.assign(new Error(`Request failed with HTTP ${res.status}`), {
			status: res.status
		});
	}
	return res.json();
};
