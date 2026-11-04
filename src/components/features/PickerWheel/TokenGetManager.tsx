import { encryptJson } from '@api/crypto.api';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';

const TokenGetManager: FC = () => {
	const t = useTranslations('pickerWheel');
	const [token, setToken] = useState<string | null>(null);

	const options = useAppSelector((state) => state.pickerWheelSlice.options);
	const dispatch = useAppDispatch();

	const encrypt = async () => {
		const response = await dispatch(encryptJson(options));

		// @ts-ignore
		setToken(response.payload?.token);
	};

	return (
		<>
			<p className="text-green-dark dark:text-yellow mb-3">
				{t('generateTokenDescription')}
			</p>

			<div className="flex flex-row flex-wrap gap-4">
				<Button onClick={encrypt}>{t('generateToken')}</Button>
				{token && (
					<>
						<CopyButton
							label={t('copyToken')}
							copiedLabel={t('copiedToken')}
							copyValue={token}
						/>
						<CopyButton
							label={t('copyUrl')}
							copiedLabel={t('copiedUrl')}
							copyValue={token}
							disabled
						/>
					</>
				)}
			</div>
		</>
	);
};

export default TokenGetManager;
