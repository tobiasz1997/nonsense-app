import { useCallback } from 'react';

const useStringHelpers = () => {
	const convertArrayToString = useCallback(
		(array: Array<any> | null | undefined): string | null => {
			if (!array) {
				return null;
			}
			return `[${array.map(String).join()}]`;
		},
		[]
	);

	return {
		convertArrayToString
	};
};

export default useStringHelpers;
