/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: { remotePatterns: [
            process.env.NODE_ENV === 'development'
                ? {
                    protocol: 'https',
                    hostname: 'localhost',
                    port: '5000',
                }
                : {
                    protocol: 'https',
                    hostname: 'serverkino.ru',
                },
        ]
    },

};

export default nextConfig;