import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderType, resultType } from '@utils/generators/arrayGenerator';

type arrayStateType = {
	count: number;
	min: number;
	max: number;
	orderType: orderType;
	sorted: boolean;
	resultType: resultType;
};

export const initialArraySlicerState: arrayStateType = {
	count: 10,
	min: 0,
	max: 1_000,
	orderType: 'sequential',
	sorted: true,
	resultType: 'array'
};

const arraySlice = createSlice({
	name: 'array',
	initialState: initialArraySlicerState,
	reducers: {
		setArrayCount(state, action: PayloadAction<number>) {
			state.count = action.payload;
		},
		setArrayMinValue(state, action: PayloadAction<number>) {
			state.min = action.payload;
		},
		setArrayMaxValue(state, action: PayloadAction<number>) {
			state.max = action.payload;
		},
		setArrayOrderType(state, action: PayloadAction<orderType>) {
			state.orderType = action.payload;
		},
		setArraySorted(state, action: PayloadAction<boolean>) {
			state.sorted = action.payload;
		},
		setArrayResultType(state, action: PayloadAction<resultType>) {
			state.resultType = action.payload;
		}
	}
});

export const {
	setArrayCount,
	setArrayMinValue,
	setArrayMaxValue,
	setArrayOrderType,
	setArraySorted,
	setArrayResultType
} = arraySlice.actions;
export default arraySlice.reducer;
