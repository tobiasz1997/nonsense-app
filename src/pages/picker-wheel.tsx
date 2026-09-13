import Confetti from '@components/features/PickerWheel/Confetti';
import GetSetTokenModal from '@components/features/PickerWheel/GetSetTokenModal';
import ManageOptionFormModal from '@components/features/PickerWheel/ManageOptionFormModal';
import ManageOptionsFormModal from '@components/features/PickerWheel/ManageOptionsFormModal';
import Wheel from '@components/features/PickerWheel/Wheel';
import WheelManagePanel from '@components/features/PickerWheel/WheelManagePanel';
import WinnerModal from '@components/features/PickerWheel/WinnerModal';
import { AppPage } from '@interfaces/appPage';
import { setWinner } from '@store/slices/pickerWheel.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useMemo } from 'react';

const PickerWheelPage: AppPage = () => {
	const winner = useAppSelector((state) => state.pickerWheelSlice.winner);
	const options = useAppSelector((state) => state.pickerWheelSlice.options);
	const winnerModal = useAppSelector(
		(state) => state.pickerWheelSlice.winnerModal
	);
	const optionsFormModal = useAppSelector(
		(state) => state.pickerWheelSlice.optionsFormModal
	);
	const optionFormModal = useAppSelector(
		(state) => state.pickerWheelSlice.optionFormModal
	);
	const getSetOptionsModal = useAppSelector(
		(state) => state.pickerWheelSlice.getSetOptionsModal
	);
	const editedOption = useAppSelector(
		(state) => state.pickerWheelSlice.editedOption
	);

	const activeOptions = useMemo(
		() => options.filter((option) => option.active),
		[options]
	);

	const dispatch = useAppDispatch();

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Picker Wheel</h1>

			<section className="flex flex-col md:flex-row gap-4 md:items-start">
				<div className="flex-1 flex justify-center items-center">
					<Wheel
						options={activeOptions}
						winner={winner}
						setWinner={(winner) => dispatch(setWinner(winner))}
					/>
				</div>
				<div className="md:w-1/3 flex flex-col">
					{options.length > 0 && <WheelManagePanel winner={winner} />}
				</div>
			</section>

			{winnerModal && winner && (
				<>
					<WinnerModal winner={winner} />
					<Confetti active={true} />
				</>
			)}
			{optionsFormModal && <ManageOptionsFormModal options={options} />}
			{optionFormModal && <ManageOptionFormModal option={editedOption} />}
			{getSetOptionsModal && <GetSetTokenModal />}
		</div>
	);
};

PickerWheelPage.layoutType = 'full';
export default PickerWheelPage;
