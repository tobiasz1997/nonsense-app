import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, PropsWithChildren } from 'react';
import Button from '@components/ui/Button';

type Props = {
	onClose: () => void;
};

const ModalBox: FC<Props & PropsWithChildren> = (props) => {
	return (
		<div className="m-3 w-full max-w-screen-sm">
			<div className="relative rounded-xl bg-pistachio dark:bg-gray-500 p-5 dark:border dark:border-gray-700">
				<div className="absolute top-3 right-3">
					<Button
						className="p-1"
						variant="secondary"
						size="fit"
						icon={<XMarkIcon />}
						onClick={props.onClose}
					/>
				</div>
				{props.children}
			</div>
		</div>
	);
};

export default ModalBox;
