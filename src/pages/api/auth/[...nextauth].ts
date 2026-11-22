import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthOptions, isAuthConfigured } from '@utils/auth';
import NextAuth from 'next-auth';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader('Cache-Control', 'private, no-store');
	if (!isAuthConfigured()) {
		return res.status(503).json({ error: 'Authentication is not configured.' });
	}

	return NextAuth(req, res, getAuthOptions());
}
