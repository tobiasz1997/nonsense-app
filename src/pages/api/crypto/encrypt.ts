import type { NextApiRequest, NextApiResponse } from 'next';
import { encryptJson } from '@crypto/crypto-json';

export type ResponseData = { token: string } | { error: string };

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const secret = process.env.JSON_SECRET_KEY;

	if (!secret) {
		return res.status(500).json({ error: 'Missing JSON_SECRET_KEY' });
	}

	try {
		const token = encryptJson(req.body, secret);

		return res.status(200).json({ token });
	} catch {
		return res.status(400).json({ error: 'Invalid request body' });
	}
}
