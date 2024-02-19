/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "tr"],
    defaultLocale: "tr",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

module.exports = nextConfig;
