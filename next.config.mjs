/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },
};

export default nextConfig;
