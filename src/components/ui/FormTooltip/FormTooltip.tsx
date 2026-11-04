import Tooltip from '@components/ui/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { FC, ReactNode } from 'react';

type Props = {
	tooltip: ReactNode;
};

const FormLabel: FC<Props> = (props) => {
	return (
		<div className="absolute top-1 right-3">
			<Tooltip content={props.tooltip} placement="auto">
				<InformationCircleIcon className="text-green-dark w-5 h-5 cursor-pointer" />
			</Tooltip>
		</div>
	);
};

export default FormLabel;
