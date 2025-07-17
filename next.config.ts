import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'
import { type NextConfig } from 'next'
import { env } from '@/utilities/env'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || env.NEXT_PUBLIC_SERVER_URL

const nextConfig: NextConfig = {
  compiler: {
    // remove console.logs in production mode
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    browserDebugInfoInTerminal: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map(item => ({
        hostname: new URL(item).hostname,
        protocol: new URL(item).protocol.replace(':', '') as 'http' | 'https',
      })),
    ],
    formats: ['image/avif', 'image/webp'],
    // deviceSizes: [220, 390, 430, 640, 768, 1080, 1280, 1920, 2048, 2560, 3840],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (webpackConfig: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
