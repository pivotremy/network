/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
    ],
  },
};

// next.config.js
const nextConfiguration = {
  ...nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: "/features/tab-autocomplete",
        destination: "/docs/tab-autocomplete",
        permanent: true,
      },
      {
        source: "/download",
        destination: "/pricing",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfiguration;
