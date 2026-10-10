import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { regonType } from '@utils/generators/regonGenerator';

type regonStateType = {
	type: regonType;
};

const initialState: regonStateType = {
	type: 'long'
};

const regonSlice = createSlice({
	name: 'regon',
	initialState: initialState,
	reducers: {
		changeRegonType(state, action: PayloadAction<regonType>) {
			state.type = action.payload;
		}
	}
});

export const { changeRegonType } = regonSlice.actions;
export default regonSlice.reducer;
