#!/usr/bin/env ts-node
import { getFilePaths, generateAST, extractClasses, filterClasses, writeCSS, ProcessRetriever, readConfigFile } from './helpers';

// const flags = new ProcessRetriever(process);

/** Directories. Write: generated css utils. Read: classNames to interpret */
const directory = {
  writeTo: readConfigFile()?.writeTo || "styles/utilities.css",
  readFrom: readConfigFile()?.readFrom || "/"
}
let rawClasses: string[] = []

// 1 Get File paths
console.log(directory.readFrom)
const filePaths = getFilePaths(directory.readFrom);
filePaths.forEach((path) => {
  console.log(path)
  
  // 1.1 Parse .tsx into AST
  const ast = generateAST(path)
  
  // 1.2 Get all className attributes from AST
  rawClasses = [...extractClasses({ast}), ...rawClasses]
})

// 2 Filter out none utility classes
const classes = filterClasses(rawClasses)

// 3 Translate to CSS & writeTo path
writeCSS({classes, dir: directory.writeTo})