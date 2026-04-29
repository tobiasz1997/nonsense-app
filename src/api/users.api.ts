import { IUser } from '@interfaces/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('getUsers', async () => {
	const response = await axios.get<IUser[]>(
		'https://jsonplaceholder.typicode.com/users/'
	);
	return response.data;
});
