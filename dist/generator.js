#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
/** run utils welcome - current version */
/** Directories. Write: generated css utils. Read: classNames to interpret */
const { writeTo = "./styles/utilities.css", readFrom = "./" } = (0, helpers_1.readConfigFile)();
let rawClasses = [];
// 1 Get File paths
const filePaths = (0, helpers_1.getFilePaths)(readFrom);
filePaths.forEach((path) => {
    // 1.1 Parse .tsx into AST
    const ast = (0, helpers_1.generateAST)(path);
    // 1.2 Get all className attributes from AST
    rawClasses = [...(0, helpers_1.extractClasses)({ ast }), ...rawClasses];
});
// 2 Filter utility classes, ex. "flex d-f ml-20" => "d-f ml-20"
const classes = (0, helpers_1.filterClasses)(rawClasses);
// 3 Translate to CSS & writeTo path
(0, helpers_1.writeCSS)({ classes, filePath: writeTo });
//# sourceMappingURL=generator.js.map