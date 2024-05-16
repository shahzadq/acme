/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: ["@workspace/db-todos", "@workspace/web-ui"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
