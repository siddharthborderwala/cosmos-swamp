/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: () => {
		return [
			{
				source: "/",
				destination: "/cosmoshub-4",
				permanent: true,
			},
		];
	},
	images: {
		domains: ['assets.leapwallet.io'],
	},
};

export default nextConfig;
