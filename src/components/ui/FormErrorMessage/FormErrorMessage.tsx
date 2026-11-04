import { FC, PropsWithChildren } from 'react';

const FormErrorMessage: FC<PropsWithChildren> = (props) => {
	return <div className="my-2 text-xs text-red">{props.children}</div>;
};

export default FormErrorMessage;
