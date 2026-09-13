import { encryptJson } from '@api/crypto.api';
import Button from '@components/ui/Button';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { FC, useState } from 'react';
import copy from 'copy-to-clipboard';

const TokenGetManager: FC = () => {
	const [token, setToken] = useState<string | null>(null);

	const options = useAppSelector((state) => state.pickerWheelSlice.options);
	const dispatch = useAppDispatch();

	const encrypt = async () => {
		const response = await dispatch(encryptJson(options));

		// @ts-ignore
		setToken(response.payload?.token);
	};

    const handleCopyToken = () => {
        copy(token as string);
    };

    const handleCopyUrl = () => {
        copy(token as string);
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
						<Button onClick={handleCopyToken}>
							Copy Token
						</Button>
						<Button onClick={handleCopyUrl} disabled={true}>
							Copy Url
						</Button>
					</>
				)}
			</div>
		</>
	);
};

export default TokenGetManager;
