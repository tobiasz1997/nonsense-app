import { FC, PropsWithChildren } from 'react';

type Props = {
	required?: boolean;
};

const FormLabel: FC<PropsWithChildren & Props> = (props) => {
	return (
		<span className="flex space-x-1 text-xs">
			<span className="block font-bold">{props.children}</span>
			{props.required && <span className="text-red">*</span>}
		</span>
	);
};

export default FormLabel;
