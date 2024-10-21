#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Generate utils and compare with current */
const fs = __importStar(require("fs"));
const helpers_1 = require("./helpers");
/** run utils welcome - current version */
console.log(`\nUtility CSS Generator v${(0, helpers_1.packageVersion)()}\n`);
/** Directories. Write: generated css utils. Read: classNames to interpret */
const { writeTo = "./styles/utilities.css", readFrom = "./" } = (0, helpers_1.readConfigFile)();
// 1 Get File paths
const filePaths = (0, helpers_1.getFilePaths)(readFrom);
const rawClasses = filePaths.reduce((acc, path) => {
    // 1.1 Parse .tsx into AST
    const ast = (0, helpers_1.generateAST)(path);
    // 1.2 Get all className attributes from AST
    const classes = (0, helpers_1.getClassNames)({ ast });
    if (classes) {
        acc.push(...classes.split(" "));
    }
    return acc;
}, []);
// 2 Filter utility classes, ex. "flex d-f ml-20" => "d-f ml-20"
const classes = (0, helpers_1.filterClasses)(rawClasses);
let generatedCSS = '';
// 3 Format utilityClass into .CSS
classes.forEach(({ fullClass, classKey, classValue }) => {
    generatedCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
});
const currentCSS = fs.readFileSync(writeTo, 'utf-8').trim();
if (currentCSS.replace(/\s+/g, '') === generatedCSS.replace(/\s+/g, '')) {
    console.log('Generated css utilities are up to date.');
    process.exit(0); // Success
}
else {
    console.error('Generated css utilities are outdated.');
    process.exit(1); // Failure
}
//# sourceMappingURL=check.js.map