/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.wikia.nocookie.net"]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
