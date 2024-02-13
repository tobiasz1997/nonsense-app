import React, { FC, useState } from 'react';
import InputNumberForm from '@components/features/Algorithms/Utils/InputNumberForm';
import { calculateBinarySearch } from '@utils/algorithmsFunctions';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import { CalculationResultType } from '@interfaces/calculationResultType';
import useStringHelpers from '@hooks/useStringHelpers';
import CustomBox from '@components/ui/CustomBox';

const BinarySearch: FC = () => {
	const [array] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
	const [value, setValue] = useState<CalculationResultType<string>>();

	const { convertArrayToString } = useStringHelpers();

	return (
		<CustomBox title="Binary search">
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// Input</div>
					<var className="na-variable">array = [1,2,3,4,5,6,7,8]</var>
					<var className="na-variable">target = 3</var>
					<div className="na-comment">// Flow</div>
					<var className="na-variable">
						[<span className="text-orange">1</span>,2,3,
						<span className="text-yellow">4</span>,5,6,7,
						<span className="text-orange">8</span>]
					</var>
					<var className="na-variable">
						[<span className="text-orange">1</span>,
						<span className="text-yellow">2</span>,
						<span className="text-orange">3</span>,4,5,6,7,8]
					</var>
					<var className="na-variable">
						[1,2,<span className="text-yellow">3</span>,4,5,6,7,8]
					</var>
					<div className="na-comment">// Output</div>
					<samp className="na-sample">Number 3 is exist in array</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<div className="text-green-dark">
						Current array: &nbsp;
						<span className="pl-2 font-bold">
							{convertArrayToString(array)}
						</span>
					</div>
					<InputNumberForm
						onSubmit={(number) =>
							setValue(calculateBinarySearch(array, Number(number)))
						}
					/>
					<OutputValue result={value?.result} error={value?.error} />
				</div>
			</div>
		</CustomBox>
	);
};

export default BinarySearch;
