import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, PropsWithChildren } from 'react';

type Props = {
	onClose: () => void;
};

const ModalBox: FC<Props & PropsWithChildren> = (props) => {
	return (
		<div className="m-3 w-full max-w-screen-sm">
			<div className="relative rounded-xl bg-pistachio dark:bg-gray-500 p-5 dark:border dark:border-gray-700">
				<div className="absolute top-3 right-3">
					<button
						onClick={props.onClose}
						className="flex items-center justify-center p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange"
					>
						<XMarkIcon className="h-5 w-5 text-orange" />
					</button>
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default ModalBox;
