import ExpansionPanel from '@components/ui/ExpansionPanel';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import {
	closeGetSetOptionsModal
} from '@store/slices/pickerWheel.slice';
import {useAppDispatch, useAppSelector} from '@store/store';
import React, { FC } from 'react';
import TokenSetOptionsManager from "@components/features/PickerWheel/TokenSetOptionsManager";
import TokenGetManager from "@components/features/PickerWheel/TokenGetManager";

const GetSetTokenModal: FC = () => {
	const dispatch = useAppDispatch();
    const options = useAppSelector((state) => state.pickerWheelSlice.options);

    return (
		<Modal>
			<ModalBox onClose={() => dispatch(closeGetSetOptionsModal())}>
				<h2 className="text-xl font-bold text-orange md:text-3xl">
					Get / Set Options Manager
				</h2>
                {options.length > 0 && <ExpansionPanel label="Get Options" defaultOpen={true}>
                    <TokenGetManager />
                </ExpansionPanel>}
                <ExpansionPanel label="Set Options" defaultOpen={true}>
                    <TokenSetOptionsManager />
                </ExpansionPanel>
			</ModalBox>
		</Modal>
	);
};

export default GetSetTokenModal;
