/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'utfs.io',
      },
    ],
  },
};

export default nextConfig;
