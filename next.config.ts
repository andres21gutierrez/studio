// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint:      { ignoreDuringBuilds: true },
  // NO hace falta tocar Webpack gracias a leaflet-defaulticon-compatibility
};

module.exports = nextConfig;
