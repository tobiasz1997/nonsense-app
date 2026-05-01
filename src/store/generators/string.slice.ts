import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type stringStateType = {
	length: number;
	space: boolean;
};

const initialState: stringStateType = {
	length: 187,
	space: true
};

const stringSlice = createSlice({
	name: 'string',
	initialState: initialState,
	reducers: {
		setStringLength(state, action: PayloadAction<number>) {
			state.length = action.payload;
		},
		setStringSpace(state, action: PayloadAction<boolean>) {
			state.space = action.payload;
		}
	}
});

export const { setStringLength, setStringSpace } = stringSlice.actions;
export default stringSlice.reducer;
