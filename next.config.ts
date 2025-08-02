import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack(config, {isServer}) {
    if (isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/src/ai/**'],
      };
    }
    return config;
  },
};

export default nextConfig;
