import React from 'react';
import BinarySearch from '@components/features/Algorithms/BinarySearch';
import Fibonacci from '@components/features/Algorithms/Fibonacci';
import InsertionSort from '@components/features/Algorithms/InsertionSort';
import SelectionSort from '@components/features/Algorithms/SelectionSort';
import { AppPage } from '@interfaces/appPage';

const AlgorithmsPage: AppPage = () => {
	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Algorithms</h1>

			<Fibonacci />
			<BinarySearch />
			<InsertionSort />
			<SelectionSort />
		</div>
	);
};

AlgorithmsPage.layoutType = 'full';
export default AlgorithmsPage;
