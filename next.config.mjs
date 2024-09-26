/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/weather-app",
  output: "export", // <=== enables static exports
  trailingSlash: true, // Helps with paths
  reactStrictMode: true,
};

export default nextConfig;
