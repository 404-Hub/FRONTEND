/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

const NEXTAUTH_URL='http://localhost:3001'

export default nextConfig;
