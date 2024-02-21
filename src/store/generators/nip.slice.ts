import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type nipStateType = {
	divider: boolean;
};

const initialState: nipStateType = {
	divider: false
};

const nipSlice = createSlice({
	name: 'nip',
	initialState: initialState,
	reducers: {
		setNipDivider(state, action: PayloadAction<boolean>) {
			state.divider = action.payload;
		}
	}
});

export const { setNipDivider } = nipSlice.actions;
export default nipSlice.reducer;
