import type { NextApiRequest, NextApiResponse } from 'next';
import { decryptJson } from '@crypto/crypto-json';

type ResponseData = { data: unknown } | { error: string };

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
		const { token } = req.body;

		if (!token || typeof token !== 'string') {
			return res.status(400).json({ error: 'Missing token' });
		}

		const data = decryptJson(token, secret);

		return res.status(200).json({ data });
	} catch {
		return res.status(400).json({ error: 'Invalid or modified token' });
	}
}
