// craco.conifg.js

const { whenProd } = require("@craco/craco")
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Adjust if typescript or jsx
  content: ["./src/**/*.js", "./public/index.html"],
  // regex from tailwnid docs
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
})
const tailwindcss = require("tailwindcss")

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, ...whenProd(() => [purgecss], [])],
    },
  },
}
