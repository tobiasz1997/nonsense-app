import ArrayOfNumbersForm from '@components/features/Algorithms/Utils/ArrayOfNumbersForm';
import InputNumberForm from '@components/features/Algorithms/Utils/InputNumberForm';
import InstanceValue from '@components/features/Algorithms/Utils/InstanceValue';
import OutputValue from '@components/features/Algorithms/Utils/OutputValue';
import CustomBox from '@components/ui/CustomBox';
import Divider from '@components/ui/Divider';
import useStringHelpers from '@hooks/useStringHelpers';
import { calculateBinarySearch } from '@utils/algorithmsFunctions';
import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

const BinarySearch: FC = () => {
	const t = useTranslations('algorithms');
	const [array, setArray] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
	const [target, setTarget] = useState<number>();

	const value =
		target === undefined
			? undefined
			: calculateBinarySearch(array, target, (index) =>
					index === null
						? t('targetNotFound', { target })
						: t('targetFound', { target, index })
				);

	const { convertArrayToString } = useStringHelpers();

	return (
		<CustomBox title={t('binarySearch')}>
			<div className="grid gap-5 sm:grid-cols-2">
				<code className="na-code">
					<div className="na-comment">// {t('input')}</div>
					<var className="na-variable">array = [1,2,3,4,5,6,7,8]</var>
					<var className="na-variable">target = 3</var>
					<div className="na-comment">// {t('flow')}</div>
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
					<div className="na-comment">// {t('output')}</div>
					<samp className="na-sample">{t('exampleFound', { target: 3 })}</samp>
				</code>
				<div className="flex flex-col justify-center space-y-5">
					<InstanceValue value={convertArrayToString(array)} />
					<ArrayOfNumbersForm
						initialValue={array}
						onSubmit={(numbers) => setArray(numbers)}
					/>
					<Divider />
					<InputNumberForm
						submitButtonLabel={t('search')}
						invalidParentData={array.length === 0}
						onSubmit={(number) => setTarget(Number(number))}
					/>
					<OutputValue result={value?.result} error={value?.error} />
				</div>
			</div>
		</CustomBox>
	);
};

export default BinarySearch;
