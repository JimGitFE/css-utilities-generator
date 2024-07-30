# 🎨 css-utils [![NPM](https://img.shields.io/npm/v/css-utils.svg)](https://www.npmjs.com/package/css-utils)
```
# npm
> npm i css-utils

# pnpm
> pnpm add css-utils

# yarn
> yarn add css-utils
```

TypeScript utility package that generates a utilities.css file on demand with shorthand class names for common CSS properties. By using intuitive notations like d-f (display: flex) as values for className attributes inside your jsx, this package streamlines your styling process, making your main CSS structure cleaner, reusable and more maintainable while ensuring consistent, efficient application of styles across your project.

## Usage
```JSON
  ...
  "scripts": {
    "utils": "nodemon --watch src --ext tsx,ts,js,jsx --exec ts-node node_modules/css-utils/generator.ts",
    ...
  },
  ...
```
> /package.json

## Configuration file
```JSON
{
    "onlyDictionary": true, /* Matching only dictionary or extension properties, Defaults to false */
    "units": "rem", /* Defines unit for those css properties with numeric values or others, Defaults to "px" */
    "extendKeys": /* Extend default dictionary abbreviations */ 
    {
        "fs": {"name": "font-size", "valueExtension": "vw"}, /* Would match for fs className */
        "fi": {"name": "filter", "valueExtension": ""} /* Would match for fs className */
    }
}
```
> /cuconfig.json

Example of jsx elements with above configuration set, variables usage and their respective generated classes at utilities.css

```html
<div className="d-f ml-40">
    <h1 className="fs-2 c--brand-primary">
        Hello World!
...
```
> /src/some-file.tsx
```css
...
.d-f {display: flex}
.ml-40 {margin-left: 40rem}
.fs-2 {font-size: 2vw}
.c--brand-primary {color: var(--brand-primary)}
...
```
> src/styles/utilities.css