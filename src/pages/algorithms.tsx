import React from 'react';
import { AppPage } from '@interfaces/appPage';
import Fibonacci from '@components/features/Algorithms/Fibonacci';
import BinarySearch from '@components/features/Algorithms/BinarySearch';
import InsertionSort from '@components/features/Algorithms/InsertionSort';
import SelectionSort from '@components/features/Algorithms/SelectionSort';

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
