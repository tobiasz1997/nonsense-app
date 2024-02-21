import { FC } from 'react';

type Props = {
	title: string;
};
const OptionTitle: FC<Props> = (props) => {
	return (
		<div className="text-default font-bold text-green-dark dark:text-pistachio">
			{props.title}
		</div>
	);
};

export default OptionTitle;
