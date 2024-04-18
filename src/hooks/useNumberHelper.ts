import { useCallback } from 'react';

const useNumberHelper = () => {
	const convertNumberToArrayOfNumbers = useCallback(
		(number: number): number[] => {
			if (number < 0) {
				return [];
			}
			return Array.from({ length: number }, (_, i) => i + 1);
		},
		[]
	);

	return {
		convertNumberToArrayOfNumbers
	};
};

export default useNumberHelper;
