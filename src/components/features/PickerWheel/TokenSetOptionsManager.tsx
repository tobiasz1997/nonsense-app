import { decryptJson } from '@api/crypto.api';
import Button from '@components/ui/Button';
import FormInput from '@components/ui/FormInput';
import { useAppDispatch } from '@store/store';
import { validateRequired } from '@utils/validators';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

const TokenSetOptionsManager: FC = () => {
	const t = useTranslations();
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

		if (decryptJson.rejected.match(response)) {
			const errorKeys: Record<string, string> = {
				'Missing token': 'missingToken',
				'Invalid or modified token': 'invalidToken',
				'Method not allowed': 'methodNotAllowed',
				'Missing JSON_SECRET_KEY': 'serverConfiguration',
				'Invalid request body': 'invalidRequestBody'
			};
			setError(
				'token',
				{ message: errorKeys[response.payload?.error ?? ''] ?? 'invalidToken' },
				{ shouldFocus: true }
			);
		}
	};

	return (
		<>
			<p className="text-green-dark dark:text-yellow mb-3">
				{t('pickerWheel.importTokenDescription')}
			</p>

			<form
				className="flex flex-col gap-3"
				noValidate
				onSubmit={handleSubmit((data) => submit(data.token))}
			>
				<FormInput
					label={t('pickerWheel.token')}
					tabIndex={0}
					{...register('token', {
						...validateRequired()
					})}
					error={
						errors.token?.message &&
						t(
							errors.token?.message === 'requiredField'
								? 'validation.requiredField'
								: `pickerWheel.errors.${errors.token?.message}`
						)
					}
				/>
				<div className="flex flex-row ">
					<Button type="submit">{t('pickerWheel.readAndSetOptions')}</Button>
				</div>
			</form>
		</>
	);
};

export default TokenSetOptionsManager;
