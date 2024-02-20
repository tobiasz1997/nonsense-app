import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { regonType } from '@utils/generators/regonGenerator';

type regonStateType = {
	type: regonType;
};

const initialState: regonStateType = {
	type: 'long'
};

const regonSlice = createSlice({
	name: 'regonGenerator',
	initialState: initialState,
	reducers: {
		changeType(state, action: PayloadAction<regonType>) {
			state.type = action.payload;
		}
	}
});

export const { changeType } = regonSlice.actions;
export default regonSlice.reducer;
