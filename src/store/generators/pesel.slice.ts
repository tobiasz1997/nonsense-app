import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { genderType } from '@utils/generators/peselGenerator';

type peselStateType = {
	gender: genderType;
	minYear: number;
	maxYear: number;
	divider: boolean;
};

const initialState: peselStateType = {
	gender: 'female',
	minYear: 1900,
	maxYear: new Date().getFullYear(),
	divider: false
};

const peselSlice = createSlice({
	name: 'pesel',
	initialState: initialState,
	reducers: {
		changePeselGender(state, action: PayloadAction<genderType>) {
			state.gender = action.payload;
		},
		changePeselMinYear(state, action: PayloadAction<number>) {
			if (state.maxYear >= action.payload) {
				state.minYear = action.payload;
			}
		},
		changePeselMaxYear(state, action: PayloadAction<number>) {
			if (state.minYear <= action.payload) {
				state.maxYear = action.payload;
			}
		},
		setPeselDivider(state, action: PayloadAction<boolean>) {
			state.divider = action.payload;
		}
	}
});

export const {
	changePeselGender,
	changePeselMinYear,
	changePeselMaxYear,
	setPeselDivider
} = peselSlice.actions;
export default peselSlice.reducer;
