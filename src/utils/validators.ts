import { RegisterOptions } from 'react-hook-form';
import { Message } from 'react-hook-form/dist/types/errors';
import { ValidationRule } from 'react-hook-form/dist/types/validator';

export const numberRegex = /^\d+$/;

export const validateRequired = (
	message: string = 'Required field',
	condition?: boolean
): RegisterOptions => {
	return {
		required: {
			value: condition ?? true,
			message: message
		} as Message | ValidationRule<boolean>
	};
};

export const validateInputWithNumbers = (): RegisterOptions => {
	return {
		required: {
			value: true,
			message: 'Required field'
		},
		pattern: {
			value: numberRegex,
			message: 'Invalid value'
		}
	};
};
