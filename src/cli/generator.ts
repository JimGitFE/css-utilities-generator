#!/usr/bin/env node
import { getFilePaths, generateAST, getClassNames, filterClasses, writeCSS, readConfigFile, packageVersion } from '../helpers';

/** run utils welcome - current version */
console.log(`\nUtility CSS Generator v${packageVersion()}\n`);

/** Directories. Write: generated css utils. Read: classNames to interpret */
const { writeTo = "./styles/utilities.css", readFrom = "./" } = readConfigFile()

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

// 3 Translate to CSS & writeTo path
writeCSS({classes, filePath: writeTo})