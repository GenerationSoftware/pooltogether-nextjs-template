/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding')
    return config
  }
}

export default nextConfig

