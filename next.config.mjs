import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'

const jiti = createJiti(fileURLToPath(import.meta.url))

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./src/env/server.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.REMOTE_IMAGE_HOST,
      },
      {
        protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
        hostname:
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      },
    ],
  },
}

export default nextConfig
