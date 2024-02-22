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
    },
    images: {
        domains: ['res.cloudinary.com', 'placehold.co'],
        dangerouslyAllowSVG: true
      },
};


export default nextConfig;