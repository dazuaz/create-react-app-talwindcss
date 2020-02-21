# How to add TailwindCSS to Create-React-App

[**Tailwind CSS**](https://tailwindcss.com/) is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

## Create-React-App

Create React App already comes with PostCSS optimized configuration via [react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js), it makes sense to extend it and not override its configuration. To keep as much of the current and future default CRA configs, we use [Craco](https://github.com/gsoft-inc/craco), a package that lets you extend or override it.

## How this repo was created

    npx create-react-app my-app; cd my-app
    npm install tailwindcss @fullhuman/postcss-purgecss @craco/craco
    npx tailwindcss init

Configs:

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

    // package.json
    ...
    "scripts": {
        "prestart": "npm run build:tailwind",
        "start": "craco start",
        "prebuild": "npm run build:tailwind",
        "build": "craco build",
        "build:tailwind": "tailwind build ./src/tailwind.src.css -o ./src/tailwind.css",
        "test": "craco test"
    },


    // tailwind.src.css

    /* purgecss start ignore */
    @tailwind base;
    @tailwind components;
    /* purgecss end ignore */
    @tailwind utilities;

    // ./src/index.js

    import "./tailwind.css"
    ...

## Sumary

- Include PurgeCSS and tailwindcss as PostCSS _plugins_ via extending postcss craco.config.js
  - If needed Adjust file search pattern i.e. add .jsx or .ts
- Import TailwindCSS output css file to your project
  - Run npx tailwindcss init to create and empty tailwind config file
  - Create tailwind.src.css with default directives
  - Import the built tailwind.css file to your project
- Update scripts of package.json
  - If needed change "build:tailwindcss" to point to your tailwind locations

## Bonus

The sample app on this repo is a copy of the origianl sample from CRA using TailwindCSS
