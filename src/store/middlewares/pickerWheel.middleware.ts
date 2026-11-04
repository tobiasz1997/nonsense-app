import { decryptJson } from '@api/crypto.api';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
	addOption,
	addOptions,
	deleteOption,
	editOption,
	manageOptionActive,
	setColor,
	setStarRating
} from '@store/slices/pickerWheel.slice';
import { RootState } from '@store/store';
import { localStorageSet } from '@utils/localStorage';
import { PICKER_WHEEL_KEY } from '../../const/storageKeys.const';

const pickerWheelListenerMiddleware = createListenerMiddleware();

pickerWheelListenerMiddleware.startListening({
	matcher: isAnyOf(
		addOptions,
		addOption,
		editOption,
		deleteOption,
		manageOptionActive,
		setStarRating,
		setColor,
		decryptJson.fulfilled
	),
	effect: (_, listenerApi) => {
		const state = listenerApi.getState() as RootState;

		localStorageSet(PICKER_WHEEL_KEY, state.pickerWheelSlice.options);
	}
});

export const pickerWheelMiddleware = pickerWheelListenerMiddleware.middleware;
