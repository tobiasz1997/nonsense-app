import React, { FC, useState } from 'react';
import { CalculationResultType } from '@interfaces/calculationResultType';
import useStringHelpers from '@hooks/useStringHelpers';
import AlgorithmBox from '@components/features/Algorithms/Utils/AlgorithmBox';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import Button from '@components/ui/Button';
import { calculateInsertionSort } from '@utils/algorithmsFunctions';

const InsertionSort: FC = () => {
	const [array] = useState([4, 22, 8, 77, 3, 15, 1, 8, 2, 13, 7, 6, 5]);
	const [value, setValue] = useState<CalculationResultType<Array<number>>>();

	const { convertArrayToString } = useStringHelpers();

	return (
		<AlgorithmBox title="Insertion sort">
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// Input</div>
					<var className="na-variable">array = [4,1,3,2]</var>
					<div className="na-comment">// Flow</div>
					<var className="na-variable">
						array = [<span className="text-orange">4</span>,1,3,2] &rarr; [
						<span className="text-yellow">4</span>,1,3,2]
					</var>
					<var className="na-variable">
						array = [4,<span className="text-orange">1</span>,3,2] &rarr; [
						<span className="text-yellow">1</span>,4,3,2]
					</var>
					<var className="na-variable">
						array = [4,1,<span className="text-orange">3</span>,2] &rarr; [1,
						<span className="text-yellow">3</span>,4,2]
					</var>
					<var className="na-variable">
						array = [4,1,3,<span className="text-orange">2</span>] &rarr; [1,
						<span className="text-yellow">2</span>,3,4]
					</var>
					<div className="na-comment">// Output</div>
					<samp className="na-sample">[1,2,3,4]</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<div className="text-green-dark">
						Current array: &nbsp;
						<span className="pl-2 font-bold">
							{convertArrayToString(array)}
						</span>
					</div>
					<Button onClick={() => setValue(calculateInsertionSort(array))}>
						Calculate
					</Button>
					<OutputValue
						result={convertArrayToString(value?.result)}
						error={value?.error}
					/>
				</div>
			</div>
		</AlgorithmBox>
	);
};

export default InsertionSort;
