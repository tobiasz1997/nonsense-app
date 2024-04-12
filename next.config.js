/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'deckofcardsapi.com',
				port: '',
				pathname: '/static/img/**'
			}
		]
	}
};

module.exports = nextConfig;
