/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com']
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
