// must restart server whenever you make changes in next.config

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  env: {
    JWT_SECRET: "r++3RX7G+rGINHVWNnoSp+uCwa6E+KvdrWRb0FRgctw=", // Update here your JWT_SECRET
  },

  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: true,
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhrcafda6/image/upload/**",
      },
    ],
  },
};
module.exports = nextConfig;
