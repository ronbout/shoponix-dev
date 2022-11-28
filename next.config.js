// must restart server whenever you make changes in next.config

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  env: {
    MONGO_SRV:
      "mongodb+srv://moshoppa_db_user:VLYQPrpLvllCIX92@cluster0.h5ssnil.mongodb.net/?retryWrites=true&w=majority", // Update here your mongodb database URL
    JWT_SECRET: "r++3RX7G+rGINHVWNnoSp+uCwa6E+KvdrWRb0FRgctw=", // Update here your JWT_SECRET
    //   // CLOUDINARY_URL:
    //   //   "cloudinary://783796461164214:aC71NfvndxLkhZtIA_2Jk3r7MhI@dhrcafda6",
    //   CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dhrcafda6/image/upload",
    STRIPE_SECRET_KEY: "xxx", // Update here your STRIPE_SECRET_KEY
  },

  // reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: true,
  optimizeFonts: false,
  distDir: "build",
};
module.exports = nextConfig;
