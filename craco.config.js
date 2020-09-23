// craco.conifg.js
const postcssPresetEnv = require("postcss-preset-env");
const tailwindcss = require("tailwindcss");

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss,
        // recreate CRA original postcss config
        postcssPresetEnv({
          autoprefixer: {
            flexbox: "no-2009",
          },
          stage: 3,
          features: {
            "custom-properties": false,
          },
        }),
      ],
    },
  },
};
