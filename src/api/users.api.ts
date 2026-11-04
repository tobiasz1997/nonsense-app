import { API_URLS } from '@api/api-urls.const';
import { IUser } from '@interfaces/IUser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('getUsers', async () => {
	const response = await axios.get<IUser[]>(API_URLS.users, {});
	return response.data;
});
