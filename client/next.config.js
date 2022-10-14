/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_BACKEND: 'http://192.168.72.81:7000/api',
  },
  swcMinify: true,
}

module.exports = nextConfig
