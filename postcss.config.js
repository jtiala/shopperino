const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.tsx"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("postcss-import"),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
