#!/usr/bin/env node
/** Generate utils and compare with current */
import fs from 'fs';
// Local
import { getFilePaths, generateAST, getClassNames, filterClasses, writeCSS, readUserConfig, packageVersion } from '@/utils';

/** run utils welcome - current version */
console.log(`\nUtility CSS Generator v${packageVersion()}\n`);

/** Directories. Write: generated css utils. Read: classNames to interpret */
const { writeTo = "./styles/utilities.css", readFrom = "./" } = readUserConfig()

// 1 Get File paths
const filePaths = getFilePaths(readFrom);
const rawClasses: string[] = filePaths.reduce((acc: string[], path) => {
  // 1.1 Parse .tsx into AST
  const ast = generateAST(path);
  
  // 1.2 Get all className attributes from AST
  const classes = getClassNames({ast});
  
  if (classes) {
    acc.push(...classes.split(" "));
  }
  
  return acc;
}, []);

// 2 Filter utility classes, ex. "flex d-f ml-20" => "d-f ml-20"
const classes = filterClasses(rawClasses)

let generatedCSS: string = '';

// 3 Format utilityClass into .CSS
classes.forEach(({ fullClass, classKey, classValue }) => {
  generatedCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
});

const currentCSS = fs.readFileSync(writeTo, 'utf-8').trim();

if (currentCSS.replace(/\s+/g, '') === generatedCSS.replace(/\s+/g, '')) {
    console.log('Generated css utilities are up to date.')
    process.exit(0)
} else {
    console.error('Generated css utilities are outdated.')
    process.exit(1)
}