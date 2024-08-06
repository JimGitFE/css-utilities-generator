# 🎨 css-utilities-generator [![NPM](https://img.shields.io/npm/v/css-utilities-generator.svg)](https://www.npmjs.com/package/css-utilities-generator)

```html
<div className="d-f jc-sb mxw-1050">
  <button>Log In</button>
  <p>Description</p>
</div>
```
> some-file.tsx
```css
.d-f { display: flex; }
.jc-sb { justify-content: space-between; }
.mxw-1050 { max-width: 1050px; }
```
> utilities.css

TypeScript utility package that generates a utilities.css file on demand with shorthand class names for common CSS properties. By using intuitive notations like d-f (display: flex) as values for className attributes inside your jsx, this package streamlines your styling process, making your main CSS structure cleaner, reusable and more maintainable while ensuring consistent, efficient application of styles across your project.

## Installation & Setup (Auto)
First, install the css-utilities-generator package and its dependencies in your project:
```bash
# 1 npm
> npm i -D css-utilities-generator@latest
```
The package includes a setup script that will add a necessary configuration to your package.json.
```bash
# 2 Run the following script to add the command to your project:
> node node_modules/css-utilities-generator/setup.js
```
Script adds a new npm script to your package.json file called "utils" with the following value, "nodemon --watch src --ext tsx,ts,js,jsx --exec ts-node node_modules/css-utilities-generator/generator.ts", to handle watching for file changes.

Run the following command to start the watcher:
```bash
# 3 Generate css file on save:
> npm run utils
```
Now, you can start watching for changes in your src directory and automatically regenerate the CSS utilities. 

## Configuration file (Defaults)
```javascript
{
    "onlyDictionary": true, /* Matching only dictionary or extension properties */
    "acceptAnyKey": false,
    "acceptAnyValue": true,
    "units": "rem", /* Defines unit for those css properties with numeric values or others */
    "extendKeys": /* Extend default dictionary abbreviations */ 
    {
        "fs": {"name": "font-size", "valueExtension": "vw"}, /* Would match for fs className */
        "fi": {"name": "filter", "valueExtension": ""} /* Would match for fs className */
    },
    "writeTo": "./styles/utilities.css", /* Where to write generated css file */
    "readFrom": "./", /* Where to parse - interpret files from */
    "extensions": ["tsx", "ts", "js", "jsx"] /* Read className attributes from files with extensions in Array */
    "exclude": ["node_modules", ".git"] /* Exclude directories from having files parsed, traversed ...  */
}
```
> /cuconfig.json

## Usage
Example of jsx elements with above configuration set, variables usage and their respective generated classes at utilities.css

```html
<div className="d-f ml-40">
    <h1 className="fs-2 c--brand-primary">
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

# Contributions

This project encourages contributions and suggestions.