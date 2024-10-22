# 🎨 css-utilities-generator [![NPM](https://img.shields.io/npm/v/css-utilities-generator.svg)](https://www.npmjs.com/package/css-utilities-generator) ![NPM](https://github.com/JimGitFE/css-utilities-generator/actions/workflows/integrate.yml/badge.svg)

![Preview](./preview.gif)

TypeScript utility package that generates a utilities.css file on demand with shorthand class names for common CSS properties. By using intuitive notations like d-f (display: flex) as values for className attributes inside your jsx, this package streamlines your styling process, making your main CSS structure cleaner, reusable and more maintainable while ensuring consistent, efficient application of styles across your project.

## Installation & Setup (Auto)
First, run create-css-utilities auto executable, installing css-utilities-generator, dependencies and configuration files into your project:
```bash
# Automatic installation executable:
> npx create-css-utilities
```

Run the following command to start generatic css utilities:
```bash
# Run the following command (generates css utilities on save):
> npm run utils
```
Now import the generated css file to the project root file, start watching for changes in your root directory and automatically regenerate the CSS utilities. 

## Dictionary
| Property                | Class      | CSS Output                       | ___ | Property                | Class      | CSS Output                       |
|-------------------------|------------|----------------------------------|----|-------------------------|------------|----------------------------------|
| display                 | .d-f      | { display: flex }                | ___ | justify-content          | .jc-c      | { justify-content: center }      |
|                         | .d-n      | { display: none }                | ___ |                          | .jc-sb     | { justify-content: space-between }|
|                         | .d-b      | { display: block }               | ___ |                          | .jc-sa     | { justify-content: space-around } |
|                         | .d-g      | { display: grid }                | ___ |                          | .jc-fe     | { justify-content: flex-end }    |
| flex-direction          | .fd-r    | { flex-direction: row }          | ___ | align-items             | .ai-c    | { align-items: center }          |
|                         | .fd-c    | { flex-direction: column }       | ___ |                         | .ai-s    | { align-items: start }           |
|                         | .fd-rr   | { flex-direction: row-reverse }  | ___ |                         | .ai-e    | { align-items: end }             |
|                         | .fd-cr   | { flex-direction: column-reverse }| ___ |                         | .ai-ba    | { align-items: baseline }        |
|                         | .fd-d    | { flex-direction: inherit }      | ___ | align-content           | .ac-s    | { align-content: start }         |
|                         | .fd-n    | { flex-direction: none }         | ___ |                         | .ac-e    | { align-content: end }           |
|                         | .fd-r    | { flex-direction: row }          | ___ |                         | .ac-c    | { align-content: center }        |
|                         | .fd-c    | { flex-direction: column }       | ___ |                         | .ac-ba    | { align-content: baseline }      |
| grid-template-columns    | .gtc-2  | { grid-template-columns: 2 } | ___ | gap                     | .gap      | { gap: value }                  |
|                         | .gtc-3  | { grid-template-columns: 3 } | ___ | gap                     | .gap-40      | { gap: 40px }                  |
|                         | .gtc-4  | { grid-template-columns: 4 } | ___ | gap                     | .gap-20vw      | { gap: 20vw }                  |
|                         | .gtc-5  | { grid-template-columns: 5 } | ___ | gap                     | .gap-80      | { gap: 80px }                  |
| margin                  | .m        | { margin: value }                | ___ | padding                 | .p        | { padding: value }              |
|                         | .ml-40       | { margin-left: 40px }           | ___ | padding-left            | .pl-40       | { padding-left: 40px }         |
|                         | .mr-20vw       | { margin-right: 20vw }          | ___ | padding-right           | .pr-20vw       | { padding-right: 20vw }        |
|                         | .mt-80       | { margin-top: 80px }            | ___ | padding-top             | .pt-80       | { padding-top: 80px }          |
|                         | .mb       | { margin-bottom: value }         | ___ | padding-bottom          | .pb       | { padding-bottom: value }       |

## Example
```html
  <main className="ml-50 mr-50">
    <header className="d-f h-64px ai-c jc-sb pos-sticky top-0 z-5">
```
> some-file.tsx
```css
.ml-50 { margin-left: 50px; }
.mr-50 { margin-right: 50px; }
.d-f { display: flex; }
.h-64px { height: 64px; }
.ai-c { align-items: center; }
.jc-sb { justify-content: space-between; }
.pos-sticky { position: sticky; }
.z-5 { z-index: 5; }
```
> utilities.css

## Configuration File (Defaults)
```javascript
{
    "acceptAnyVariable": true, /* Matching only dictionary or extension properties, Defaults to false */
    "acceptAnyKey": false, /* Applies only key */
    "acceptAnyValue": true, /* Applies only value */
    "units": "rem", /* Defines unit for those css properties with numeric values or others, Defaults to "px" */
    "extendKeys": /* Extend default dictionary abbreviations */ 
    {
        "fs": {"name": "font-size", "valueExtension": "vw"}, /* Would match for fs className */
        "fi": {"name": "filter", "valueExtension": ""} /* Would match for fs className */
    },
    "writeTo": "./styles/utilities.css", /* Where to write generated css file, Defaults to "./styles/utilities.css" */
    "readFrom": "./", /* Where to parse - interpret files from, Defaults to "./" */
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

# Contributions

This project encourages contributions and suggestions.
