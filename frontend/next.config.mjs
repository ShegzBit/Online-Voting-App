/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: 'https://pollmaster.webflow.io/',
                permanent: false
            }
        ]
    }
};


export default nextConfig;