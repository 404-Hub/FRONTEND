import withNextIntl from 'next-intl/plugin'

const wrap = withNextIntl()

const nextConfig = wrap({
  experimental: {
    serverActions: true,
  },
});

export default nextConfig;
