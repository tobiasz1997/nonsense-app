import TokenGetManager from '@components/features/PickerWheel/TokenGetManager';
import TokenSetOptionsManager from '@components/features/PickerWheel/TokenSetOptionsManager';
import ExpansionPanel from '@components/ui/ExpansionPanel';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';
import { closeGetSetOptionsModal } from '@store/slices/pickerWheel.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

const GetSetTokenModal: FC = () => {
	const t = useTranslations('pickerWheel');
	const dispatch = useAppDispatch();
	const options = useAppSelector((state) => state.pickerWheelSlice.options);

	return (
		<Modal>
			<ModalBox onClose={() => dispatch(closeGetSetOptionsModal())}>
				<h2 className="text-xl font-bold text-orange md:text-3xl">
					{t('getSetOptions')}
				</h2>
				{options.length > 0 && (
					<ExpansionPanel label={t('getOptions')} defaultOpen={true}>
						<TokenGetManager />
					</ExpansionPanel>
				)}
				<ExpansionPanel label={t('setOptions')} defaultOpen={true}>
					<TokenSetOptionsManager />
				</ExpansionPanel>
			</ModalBox>
		</Modal>
	);
};

export default GetSetTokenModal;
