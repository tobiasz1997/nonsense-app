import { decryptJson } from '@api/crypto.api';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { useAppDispatch } from '@store/store';
import { validateRequired } from '@utils/validators';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

const TokenSetOptionsManager: FC = () => {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<{ token: string }>({
		reValidateMode: 'onSubmit'
	});

	const submit = async (token: string) => {
		const response = await dispatch(decryptJson(token));

		// @ts-ignore
		if (response?.error) {
			// @ts-ignore
			setError('token', { message: response?.payload.error }, true);
		}
	};

	return (
		<>
			<p className="text-green-dark dark:text-yellow mb-3">
				Set options and their settings from token
			</p>

			<form
				className="flex flex-col gap-3"
				noValidate
				onSubmit={handleSubmit((data) => submit(data.token))}
			>
				<FormInput
					label="Token"
					tabIndex={0}
					{...register('token', {
						...validateRequired()
					})}
					error={errors.token?.message}
				/>
				<div className="flex flex-row ">
					<Button type="submit">Read and Set Options from token</Button>
				</div>
			</form>
		</>
	);
};

export default TokenSetOptionsManager;
