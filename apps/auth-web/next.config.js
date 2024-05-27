/** @type {import("next").NextConfig} */
export default {
  reactStrictMode: true,
  transpilePackages: [
    "@workspace/db-auth",
    "@workspace/types",
    "@workspace/utils",
    "@workspace/web-auth",
    "@workspace/web-ui",
  ],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
