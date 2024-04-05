import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';

type Props = {
	onClose: () => void;
	onRestart: () => void;
};

const GameErrorModal: FC<Props> = (props) => {
	return (
		<Modal>
			<div className="m-3 w-full max-w-screen-sm">
				<div className="relative rounded-xl bg-pistachio p-5">
					<div className="absolute top-3 right-3">
						<button
							onClick={props.onClose}
							className="flex items-center justify-center p-1"
						>
							<XMarkIcon className="h-5 w-5 text-orange" />
						</button>
					</div>
					<h2 className="text-xl font-bold text-orange md:text-3xl">Error</h2>
					<p className="text-green-dark mt-3 mb-5">
						Something went wrong! Try again.
					</p>
					<div className="flex justify-center">
						<Button className="max-w-max" onClick={props.onRestart}>
							Restart game
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default GameErrorModal;
