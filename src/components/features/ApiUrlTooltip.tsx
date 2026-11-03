import Tooltip from '@components/ui/Tooltip';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type Props = {
	url: string;
};

const ApiUrlTooltip: FC<Props> = (props) => {
	const t = useTranslations('common');
	return (
		<div className="absolute top-0 right-0 na-p-page">
			<Tooltip
				content={
					<p>
						{t('apiUrl')} &#8594; <code className="italic">{props.url}</code>
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
