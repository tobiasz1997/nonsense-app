import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@interfaces/IUser';
import { getUsers } from '@api/users.api';
import { createSelector } from 'reselect';

type usersStateType = {
	users: IUser[];
	page: number;
	pageSize: number;
	status: 'idle' | 'loading' | 'error' | 'succeeded';
};

const initialState: usersStateType = {
	users: [],
	page: 1,
	pageSize: 5,
	status: 'idle'
};

const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.users = action.payload;
				state.status = 'succeeded';
			})
			.addCase(getUsers.rejected, (state) => {
				state.status = 'error';
			});
	}
});

export const { setPage } = usersSlice.actions;

export default usersSlice.reducer;

export const filteredData = createSelector(
	[(state) => state.users, (state) => state.page, (state) => state.pageSize],
	(users, page, pageSize) => users.slice(pageSize * (page - 1), pageSize * page)
);
