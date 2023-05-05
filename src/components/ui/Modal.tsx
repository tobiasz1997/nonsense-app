import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '@hooks/usePortal';

const Modal: FC<PropsWithChildren> = ({ children }) => {
	const portal = usePortal();
	return portal
		? createPortal(
				<div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-40">
					{children}
				</div>,
				portal
		  )
		: null;
};

export default Modal;
