import { encryptJson } from '@api/crypto.api';
import Button from '@components/ui/Button';
import CopyButton from '@components/ui/CopyButton';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { FC, useState } from 'react';

const TokenGetManager: FC = () => {
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
				Generate a token that will contain options and their settings
			</p>

			<div className="flex flex-row flex-wrap gap-4">
				<Button onClick={encrypt}>Generate Token</Button>
				{token && (
					<>
						<CopyButton
							label="Copy Token"
							copiedLabel="Copied Token"
							copyValue={token}
						/>
						<CopyButton
							label="Copy URL"
							copiedLabel="Copied URL"
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
