/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/account/:path*',
        destination: 'http://localhost:5001/api/account/:path*'
      },
      {
        source: '/api/transfer/:path*',
        destination: 'http://localhost:5002/api/transfer/:path*'
      },
      {
        source: '/api/fee/:path*',
        destination: 'http://localhost:5003/api/fee/:path*'
      }
    ]
  }
}

module.exports = nextConfig
