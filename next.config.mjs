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
};

export default nextConfig;
