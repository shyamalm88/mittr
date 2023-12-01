const path = require("path");
const isProd = process.env.NODE_ENV === "production";
module.exports = {
  // staticPageGenerationTimeout: 20,
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  poweredByHeader: false,
  images: {
    domains: ["flagcdn.com"],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: isProd ? "/api/" : "http://localhost:3000/api/",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};
