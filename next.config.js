const path = require("path");
module.exports = {
  staticPageGenerationTimeout: 20,
  productionBrowserSourceMaps: true,
  basePath: "",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["flagcdn.com"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
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
