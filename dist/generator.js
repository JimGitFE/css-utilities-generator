"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const flags = new helpers_1.ProcessRetriever(process);
/** Directories. Write: generated css utils. Read: classNames to interpret */
const directory = {
    writeTo: flags.get("writeTo") || "src/styles/utilities.css",
    readFrom: flags.get("readFrom") || "/"
};
let rawClasses = [];
// 1 Get File paths
const filePaths = (0, helpers_1.getFilePaths)(directory.readFrom);
filePaths.forEach((path) => {
    // 1.1 Parse into AST
    const ast = (0, helpers_1.generateAST)(path);
    // 1.2 Get All Classes from AST
    rawClasses = [...(0, helpers_1.extractClasses)({ ast }), ...rawClasses];
});
// 2 Filter out none utility classes
const classes = (0, helpers_1.filterClasses)(rawClasses);
// 3 Translate to CSS & writeTo path
(0, helpers_1.writeCSS)({ classes, dir: directory.writeTo });
//# sourceMappingURL=generator.js.map