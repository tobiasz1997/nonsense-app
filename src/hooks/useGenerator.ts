import { useCallback } from 'react';

const useGenerator = () => {
	const generateRandomNumber = useCallback(
		(min = 0, max = 100_000, factor?: number): number => {
			min = Math.ceil(min);
			max = Math.floor(max);
			const number = Math.floor(Math.random() * (max - min + 1)) + min;
			return factor ? number - (number % factor) : number;
		},
		[]
	);

	return {
		generateRandomNumber
	};
};

export default useGenerator;
