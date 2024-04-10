import { FC } from 'react';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';

type Props = {
	onClose: () => void;
	onRestart: () => void;
};

const GameErrorModal: FC<Props> = (props) => {
	return (
		<Modal>
			<ModalBox onClose={props.onClose}>
				<h2 className="text-xl font-bold text-orange md:text-3xl">Error</h2>
				<p className="text-green-dark dark:text-yellow mt-3 mb-5">
					Something went wrong! Try again.
				</p>
				<div className="flex justify-center">
					<Button className="max-w-max" onClick={props.onRestart}>
						Restart game
					</Button>
				</div>
			</ModalBox>
		</Modal>
	);
};

export default GameErrorModal;
