import { getFilePaths, generateAST, extractClasses, filterClasses, writeCSS, ProcessRetriever } from './helpers';

const flags = new ProcessRetriever(process);

/** Directories. Write: generated css utils. Read: classNames to interpret */
const directory = {
  writeTo: flags.get("writeTo") || "src/styles/utilities.css",
  readFrom: flags.get("readFrom") || "/"
}
let rawClasses: string[] = []

// 1 Get File paths
const filePaths = getFilePaths(directory.readFrom);
filePaths.forEach((path) => {
  
  // 1.1 Parse into AST
  const ast = generateAST(path)
  
  // 1.2 Get All Classes from AST
  rawClasses = [...extractClasses({ast}), ...rawClasses]
})

// 2 Filter out none utility classes
const classes = filterClasses(rawClasses)

// 3 Translate to CSS & writeTo path
writeCSS({classes, dir: directory.writeTo})