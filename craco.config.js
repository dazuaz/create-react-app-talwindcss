// craco.conifg.js
const tailwindcss = require("tailwindcss");

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
};
