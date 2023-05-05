import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '@interfaces/IUser';

export const getUsers = createAsyncThunk('getUsers', async () => {
	const response = await axios.get<IUser[]>(
		'https://jsonplaceholder.typicode.com/users/'
	);
	return response.data;
});
