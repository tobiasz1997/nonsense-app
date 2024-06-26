import React, { FC, useState } from 'react';
import InstanceValue from '@components/features/Algorithms/Utils/InstanceValue';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import Button from '@components/ui/Button';
import CustomBox from '@components/ui/CustomBox';
import useStringHelpers from '@hooks/useStringHelpers';
import { CalculationResultType } from '@interfaces/calculationResultType';
import { calculateSelectionSort } from '@utils/algorithmsFunctions';

const SelectionSort: FC = () => {
	const [array] = useState([7, 2, 12, 3, 44, 1, 27]);
	const [value, setValue] = useState<CalculationResultType<Array<number>>>();

	const { convertArrayToString } = useStringHelpers();

	return (
		<CustomBox title="Selection sort">
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// Input</div>
					<var className="na-variable">array = [4,1,3,2]</var>
					<div className="na-comment">// Flow</div>
					<var className="na-variable">
						array = [<span className="text-orange">4</span>,
						<span className="text-yellow">1</span>,3,2] &rarr; [
						<span className="text-yellow">1</span>,
						<span className="text-orange">4</span>,3,2]
					</var>
					<var className="na-variable">
						array = [1,<span className="text-orange">4</span>,3,
						<span className="text-yellow">2</span>] &rarr; [1,
						<span className="text-yellow">2</span>,3,
						<span className="text-orange">4</span>]
					</var>
					<var className="na-variable">
						array = [1,2,<span className="text-yellow">3</span>,4] &rarr; [1,2,
						<span className="text-yellow">3</span>,4]
					</var>
					<var className="na-variable">
						array = [1,2,3,<span className="text-yellow">4</span>] &rarr;
						[1,2,3,<span className="text-yellow">4</span>]
					</var>

					<div className="na-comment">// Output</div>
					<samp className="na-sample">[1,2,3,4]</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<InstanceValue value={convertArrayToString(array)} />
					<Button onClick={() => setValue(calculateSelectionSort(array))}>
						Calculate
					</Button>
					<OutputValue
						result={convertArrayToString(value?.result)}
						error={value?.error}
					/>
				</div>
			</div>
		</CustomBox>
	);
};

export default SelectionSort;
