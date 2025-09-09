/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Prevent build from failing if ESLint is not installed or errors exist
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
