type AddProperty = <T extends object, K extends string, V>(
	obj: T,
	key: K,
	value: V
) => asserts obj is T & Record<K, V>;

export const addProperty: AddProperty = (obj, key, value) => {
	Object.assign(obj, { [key]: value });
};
