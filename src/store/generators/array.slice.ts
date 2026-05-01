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
		setCount(state, action: PayloadAction<number>) {
			state.count = action.payload;
		},
		setMinValue(state, action: PayloadAction<number>) {
			state.min = action.payload;
		},
		setMaxValue(state, action: PayloadAction<number>) {
			state.max = action.payload;
		},
		setOrderType(state, action: PayloadAction<orderType>) {
			state.orderType = action.payload;
		},
		setSorted(state, action: PayloadAction<boolean>) {
			state.sorted = action.payload;
		},
		setResultType(state, action: PayloadAction<resultType>) {
			state.resultType = action.payload;
		}
	}
});

export const {
	setCount,
	setMinValue,
	setMaxValue,
	setOrderType,
	setSorted,
	setResultType
} = arraySlice.actions;
export default arraySlice.reducer;
