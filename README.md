# How to add TailwindCSS to Create-React-App

[**Tailwind CSS**](https://tailwindcss.com/) is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

## Create-React-App

Create React App already comes with PostCSS optimized configuration via [react-scripts](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js), it makes sense to extend it and not override its configuration. To keep as much of the current and future default CRA configs, we use [Craco](https://github.com/gsoft-inc/craco), a package that lets you extend or override it.

## How this repo was created

    npx create-react-app my-app; cd my-app
    npm install tailwindcss @fullhuman/postcss-purgecss @craco/craco
    npx tailwindcss init

### Add/Edit the folling files

#### craco.conifg.js

Craco config file, we **_extend_** CRA postcss configs by adding TailwindCSS and PurgeCSS to the already present PostCSS config(it has autoprefixer and honors the browserlist package.json settings).

```javascript
/** ./craco.conifg.js */

const { whenProd } = require("@craco/craco");
const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Adjust if typescript or jsx
  content: ["./src/**/*.js", "./public/index.html"],
  // regex from tailwnid-ui docs
  defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
});

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, ...whenProd(() => [purgecss], [])]
    }
  }
};
```

#### package.json

We replace scripts per craco documentation, and add prebuild/prestart tailwind, this reads your custom tailwind.config.js file and builds tailwind.css output file, then PurgeCSS deletes what you don't use.

TODO: If you change tailwind.src.css you need to restart the dev server (calls _tailwind build ..._)

```json
/** Modify scrips to include craco ./package.json */
...
"scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "prestart": "npm run build:tailwind",
    "prebuild": "npm run build:tailwind",
    "build:tailwind": "tailwind build ./src/tailwind.src.css -o ./src/tailwind.css"
},
...
```

#### tailwind.src.css

Don't purge tailwindcss global defaults.

```css
/* ./src/tailwind.src.css */

/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
```

#### index.js

Load the CSS file to your project.

```javascript
// ./src/index.js

import "./tailwind.css"
...
```

## Summary

- Include PurgeCSS and tailwindcss as PostCSS _plugins_ via extending postcss craco.config.js
  - If needed Adjust file search pattern i.e. add .jsx or .ts
- Import TailwindCSS output css file to your project
  - Run _npx tailwindcss init_ to create an empty tailwind config file
  - Create tailwind.src.css with default directives
  - Import the built tailwind.css file to your project
- Update scripts of package.json
  - If needed change "build:tailwindcss" to point to your tailwind locations

## Bonus

The sample app on this repo is a copy of the origianl sample from CRA using TailwindCSS
