/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // reactStrictMode: true,
    // serverActions: true,
    // swcMinify: true,
    // appDir: true
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  }
};

export default nextConfig;
