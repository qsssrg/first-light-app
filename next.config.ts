import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === 'true';

const basePath = isGhPages ? '/first-light-app' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isGhPages ? '/first-light-app/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
