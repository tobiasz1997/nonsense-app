import Tooltip from '@components/ui/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

type Props = {
	url: string;
};

const ApiUrlTooltip: FC<Props> = (props) => {
	return (
		<div className="absolute top-0 right-0 na-p-page">
			<Tooltip
				content={
					<p>
						Api URL &#8594; <code className="italic">{props.url}</code>
					</p>
				}
				placement="bottom"
			>
				<InformationCircleIcon className="dark:text-pistachio text-green-dark w-6 h-6 cursor-pointer" />
			</Tooltip>
		</div>
	);
};

export default ApiUrlTooltip;
