const { handleWebpackExternalForEdgeRuntime } = require('next/dist/build/webpack/plugins/middleware-plugin')
const { config } = require('process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      }
    ]
  }
}


module.exports = nextConfig
