import React, { FC, useState } from 'react';
import InputNumberForm from '@components/features/Algorithms/Utils/InputNumberForm';
import { CalculationResultType } from '@interfaces/calculationResultType';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import { calculateFibonacci } from '@utils/algorithmsFunctions';
import CustomBox from '@components/ui/CustomBox';

const Fibonacci: FC = () => {
	const [value, setValue] = useState<CalculationResultType<number>>();

	return (
		<CustomBox title="Fibonacci">
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// Input</div>
					<var className="na-variable">x = 7</var>
					<div className="na-comment">// Output</div>
					<samp className="na-sample">13</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<InputNumberForm
						onSubmit={(number) => setValue(calculateFibonacci(number))}
					/>
					<OutputValue
						result={value?.result?.toString()}
						error={value?.error}
					/>
				</div>
			</div>
		</CustomBox>
	);
};

export default Fibonacci;
