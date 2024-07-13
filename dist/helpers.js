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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSS = exports.filterClasses = exports.extractClasses = exports.generateAST = exports.getFilePaths = exports.ProcessRetriever = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const dictionary_1 = require("./dictionary");
/** Match example: m-16, d-f */
const utilClassReg = /^([a-zA-Z]+)-(\w+|\d+)$/;
/** Classes from attributes node */
const extractClasses = ({ ast }) => {
    let classes = [];
    let allClasses = '';
    // 1 Traverse the AST (Abstract Syntax Tree)
    (0, traverse_1.default)(ast, {
        // 2 Loop attributes
        JSXAttribute(path) {
            // 3 Match className attributes
            if (path.node.name.name === 'className') {
                const nodeValue = path.node.value;
                // Return class
                let nodeClass = () => {
                    if (nodeValue && nodeValue.type === 'StringLiteral') {
                        return (nodeValue.value);
                    }
                    else if (nodeValue && nodeValue.type === 'JSXExpressionContainer') {
                        // If the className is a JSX expression
                        const { expression } = nodeValue;
                        if (expression.type === 'TemplateLiteral') {
                            // If the expression is a template literal
                            return expression.quasis.map(quasi => quasi.value.raw).join(" ");
                        }
                    }
                };
                // 4 format into array of string classes
                allClasses += nodeClass() + " ";
                allClasses.slice(0, -1);
                classes = allClasses.split(' ');
            }
        },
    });
    return classes;
};
exports.extractClasses = extractClasses;
/** Classes filter duplicates & utilities dictionary matches
 * @returns {string[]} - Dictionary matched classes
 */
const filterClasses = (classes) => {
    let utilityClasses = [];
    // Remove duplicate & non dictionary classes
    classes.forEach(singleClass => {
        // Utility Dictionary Match
        const matchClass = singleClass.match(utilClassReg); // word-word|number
        if (matchClass) {
            const [classKey, classValue] = [matchClass[1], matchClass[2]];
            // Not Duplicate
            const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);
            // Check if prop value is a number
            const valueIsNum = /^\d+$/.test(String(classValue));
            // Exist in dictionary
            const ifExists = Object.keys(dictionary_1.shortKeys).some((abKey) => abKey === classKey) && (valueIsNum || Object.keys(dictionary_1.shortValues).some((abValue) => abValue === classValue));
            if (ifExists && !isDuplicate) {
                // Generate Valid utilityClass
                utilityClasses.push({
                    fullClass: singleClass,
                    classKey: dictionary_1.shortKeys[classKey].name,
                    classValue: `${valueIsNum ? classValue + dictionary_1.shortKeys[classKey].type : dictionary_1.shortValues[classValue]}`
                });
            }
        }
    });
    return utilityClasses;
};
exports.filterClasses = filterClasses;
const writeCSS = ({ classes, dir }) => {
    let utilitiesCSS = '';
    // 3 Format utilityClass into .CSS
    classes.forEach(({ fullClass, classKey, classValue }) => {
        utilitiesCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
    });
    // 4 Write to File
    fs_1.default.writeFileSync(dir, utilitiesCSS);
};
exports.writeCSS = writeCSS;
class ProcessRetriever {
    constructor(process) {
        this.args = process.argv.slice(2);
    }
    get(flagName) {
        let flagValue;
        this.args.forEach((arg, index) => {
            if (arg === `--${flagName}`) {
                flagValue = this.args[index + 1];
            }
        });
        return flagValue;
    }
}
exports.ProcessRetriever = ProcessRetriever;
function* readAllFiles(dir) {
    const files = fs_1.default.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* readAllFiles(path_1.default.join(dir, file.name));
        }
        else {
            yield path_1.default.join(dir, file.name);
        }
    }
}
const getFilePaths = (dir, extensions = ["tsx", "ts", "js", "jsx"]) => {
    let files = [];
    for (const file of readAllFiles('src')) {
        if (extensions.some(ext => file.endsWith(ext))) {
            files.push(file.replace(/\\/g, '/'));
        }
    }
    return files;
};
exports.getFilePaths = getFilePaths;
const generateAST = (filePath) => {
    const code = fs_1.default.readFileSync(filePath, 'utf-8');
    // Parse the code
    return parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
};
exports.generateAST = generateAST;
//# sourceMappingURL=helpers.js.map