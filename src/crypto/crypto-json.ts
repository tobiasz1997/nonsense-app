import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

function getKey(secret: string): Buffer {
	return crypto.createHash('sha256').update(secret).digest();
}

export function encryptJson(value: unknown, secret: string): string {
	const key = getKey(secret);
	const iv = crypto.randomBytes(IV_LENGTH);

	const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

	const json = JSON.stringify(value);

	const encrypted = Buffer.concat([
		cipher.update(json, 'utf8'),
		cipher.final()
	]);

	const authTag = cipher.getAuthTag();

	const payload = Buffer.concat([iv, authTag, encrypted]);

	return payload.toString('base64url');
}

export function decryptJson<T = unknown>(token: string, secret: string): T {
	const key = getKey(secret);

	const payload = Buffer.from(token, 'base64url');

	const iv = payload.subarray(0, IV_LENGTH);
	const authTag = payload.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
	const encrypted = payload.subarray(IV_LENGTH + AUTH_TAG_LENGTH);

	const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
	decipher.setAuthTag(authTag);

	const decrypted = Buffer.concat([
		decipher.update(encrypted),
		decipher.final()
	]);

	return JSON.parse(decrypted.toString('utf8')) as T;
}
