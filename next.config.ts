import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGhPages ? '/first-light-app' : '',
  assetPrefix: isGhPages ? '/first-light-app/' : '',
  trailingSlash: true,
};

export default nextConfig;
