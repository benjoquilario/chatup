/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
};

module.exports = nextConfig;
