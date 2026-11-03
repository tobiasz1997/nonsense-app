import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

type Props = {
	value: string | null;
};

const InstanceValue: FC<Props> = (props) => {
	const t = useTranslations('algorithms');

	return (
		<div className="text-green-dark dark:text-pistachio">
			{`${t('currentArray')}: `}
			<span className="font-bold wrap-anywhere">{props.value}</span>
		</div>
	);
};

export default InstanceValue;
