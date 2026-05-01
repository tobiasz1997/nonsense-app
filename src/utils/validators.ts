import {
	FieldValues,
	Message,
	RegisterOptions,
	ValidationRule,
	Path
} from 'react-hook-form';

export const numberRegex = /^\d+$/;
export const numberAndSeparatorRegex = /^\d+(;\d+)*$/;

export const validateRequired = <FV extends FieldValues, FN extends Path<FV>>(
	message: string = 'Required field',
	condition?: boolean
): RegisterOptions<FV, FN> => {
	return {
		required: {
			value: condition ?? true,
			message: message
		} as Message | ValidationRule<boolean>
	};
};

export const validateInputWithNumbers = <
	FV extends FieldValues,
	FN extends Path<FV>
>(): RegisterOptions<FV, FN> => {
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

export const validateInputWithStringOfNumbersAndSeparator = <
	FV extends FieldValues,
	FN extends Path<FV>
>(): RegisterOptions<FV, FN> => {
	return {
		required: {
			value: true,
			message: 'Required field'
		},
		pattern: {
			value: numberAndSeparatorRegex,
			message: 'Invalid format. Example: 1;33;2;44'
		}
	};
};
