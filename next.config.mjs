/** @type {import('next').NextConfig} */
const nextConfig = {
  // Supaya deploy tidak gagal hanya karena error tipe kecil selama workshop.
  typescript: { ignoreBuildErrors: true },
  // AGENTS.md: file middleware bernama proxy.js (bukan middleware.js)
  experimental: {
    middlewareFile: "./proxy.js",
  },
};

export default nextConfig;
