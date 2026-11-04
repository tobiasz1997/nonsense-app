/* eslint-disable jsx-a11y/prefer-tag-over-role */
import Button from '@components/ui/Button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useKeyPress } from '@hooks/useKeyPress';
import { FC, PropsWithChildren } from 'react';

type Props = {
	onClose: () => void;
};

const ModalBox: FC<Props & PropsWithChildren> = (props) => {
	useKeyPress('Escape', props.onClose);

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="m-3 w-full max-w-(--breakpoint-sm)"
		>
			<div className="relative rounded-xl bg-pistachio dark:bg-gray-500 p-5 dark:border dark:border-gray-700">
				<div className="absolute top-3 right-3">
					<Button
						className="p-1"
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
