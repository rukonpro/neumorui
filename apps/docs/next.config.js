/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["neumorui"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
