import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {WheelOption} from "@interfaces/wheelOption";
import {ApiError} from "@interfaces/apiErrorType";

export const encryptJson = createAsyncThunk(
	'encryptJson',
	async (body: WheelOption[]): Promise<{ token: string }> => {
		const response = await axios.post<{ token: string }>(
			'/api/crypto/encrypt',
			JSON.stringify(body),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return response.data;
	}
);

export const decryptJson = createAsyncThunk<
    { data: WheelOption[] },
    string,
    {
        rejectValue: ApiError;
    }
>(
	'decryptJson',
	async (token: string, { rejectWithValue }) => {
        try {
            const response = await axios.post<{ data: WheelOption[] }>(
                '/api/crypto/decrypt',
                { token },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data ?? {
                        error: error.message,
                    }
                );
            }

            return rejectWithValue({
                error: 'Unknown error',
            });
        }
	}
);
