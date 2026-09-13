import useGeneratePng from '@components/features/PickerWheel/useGeneratePng';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { WheelOption } from '@interfaces/wheelOption';
import {
	clearWinnerAndCloseModal,
	closeWinnerModal
} from '@store/slices/pickerWheel.slice';
import { useAppDispatch } from '@store/store';
import React, { FC } from 'react';

type Props = {
	winner: WheelOption;
};

const WinnerModal: FC<Props> = (props) => {
	const dispatch = useAppDispatch();
	const generatePng = useGeneratePng();

	return (
		<Modal>
			<ModalBox onClose={() => dispatch(closeWinnerModal())}>
				<h2 className="text-xl font-bold text-orange md:text-3xl">
					Congratulations 🎉🎉🎉
				</h2>
				<p className="text-green-dark dark:text-yellow text-xl md:text-3xl mt-3 mb-5">
					Winner: <span className="font-bold">{props.winner.name}</span>!!!
				</p>
				<div className="flex flex-col sm:flex-row justify-end gap-3">
					<Button
						className="sm:max-w-max"
						onClick={() => generatePng(props.winner)}
					>
						Download Proof PNG
					</Button>
					<Button
						className="sm:max-w-max"
						onClick={() => dispatch(clearWinnerAndCloseModal())}
					>
						Clear Option
					</Button>
				</div>
			</ModalBox>
		</Modal>
	);
};

export default WinnerModal;
