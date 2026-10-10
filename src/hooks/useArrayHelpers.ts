import { useCallback } from 'react';

type Direction = 'up' | 'down';

const useArrayHelpers = <T>() => {
	const moveItem = useCallback(
		(
			items: T[],
			predicate: (item: T) => boolean,
			direction: Direction
		): T[] => {
			const currentIndex = items.findIndex(predicate);

			if (currentIndex === -1) {
				return items;
			}

			const targetIndex =
				direction === 'up' ? currentIndex - 1 : currentIndex + 1;

			if (targetIndex < 0 || targetIndex >= items.length) {
				return items;
			}

			const result = [...items];

			[result[currentIndex], result[targetIndex]] = [
				result[targetIndex],
				result[currentIndex]
			];

			return result;
		},
		[]
	);

	return {
		moveItem
	};
};

export default useArrayHelpers;
