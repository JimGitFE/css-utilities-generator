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
exports.packageVersion = exports.writeCSS = exports.filterClasses = exports.extractClasses = exports.generateAST = exports.getFilePaths = exports.ProcessRetriever = void 0;
exports.readConfigFile = readConfigFile;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const dictionary_1 = require("./dictionary");
/** Get the package version from package.json */
const packageVersion = () => {
    return JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../package.json'), 'utf8')).version;
};
exports.packageVersion = packageVersion;
/** Classes from attributes node
 *
 * @returns {string[]} - Array of classes
 * @example
 * ```ts
 * const class = extractClasses();
 * console.log(class); // d-f jc-sb ai-c h-100 h--spacing-4
 * ```
 */
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
function inDictionary(dictionary, shortKey) {
    return Object.keys(dictionary).includes(shortKey);
}
/** Classes filter duplicates & utilities dictionary matches
 * @returns {string[]} - Dictionary matched classes
 * @example
 * ```ts
 * const classes = filterClasses(['m-10', 'd-f', 'jc-sb', 'ai-c', 'h-100', 'h--spacing-4']);
 * console.log(classes); // [{fullClass: 'm-10', classKey: 'margin', classValue: '10px'}, ...]
 * ```
 */
const filterClasses = (classes) => {
    const { onlyDictionary: notAcceptAny = true, acceptAnyKey = false, acceptAnyValue = true } = readConfigFile();
    let utilityClasses = [];
    /** @example ["m-1.6:hover", "m", "1.6"] */
    const utilClassReg = /^([a-zA-Z]+)-(\w+|[0-9.%]+)(?:-([a-zA-Z]+))?$/;
    /** @example ["h--spacing-4", "h", "spacing-4"] */
    const utilVarValReg = /^(\w+)--([\w-]+)$/;
    // Remove duplicate & non dictionary classes
    classes.forEach(singleClass => {
        var _a, _b, _c, _d;
        // Utility Dictionary Match
        const matchClass = singleClass.match(utilClassReg); // word-word|number
        const matchVariable = singleClass.match(utilVarValReg);
        if (matchVariable) {
            const [classKey, classValue] = [matchVariable[1], matchVariable[2]];
            // Not Duplicate
            const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);
            // Key exist in dictionary
            const valueCheck = (!notAcceptAny || acceptAnyKey) || (inDictionary(dictionary_1.shortKeys, classKey));
            if (!isDuplicate && (valueCheck)) {
                // Generate Valid utilityClass
                utilityClasses.push({
                    fullClass: singleClass,
                    classKey: ((_a = dictionary_1.shortKeys[classKey]) === null || _a === void 0 ? void 0 : _a.name) || classKey,
                    classValue: `var(--${classValue})`
                });
            }
        }
        else if (matchClass) {
            console.log(matchClass);
            const [classKey, classValue, classSelector] = [matchClass[1], matchClass[2], matchClass[3]];
            // Unit extension if applicable, "px" - "px solid" - "%" - ""
            const unitFromFullKey = (_b = Object.values(dictionary_1.shortKeys).find(k => k.name === classKey)) === null || _b === void 0 ? void 0 : _b.valueExtension;
            const extension = unitFromFullKey || ((_c = dictionary_1.shortKeys[classKey]) === null || _c === void 0 ? void 0 : _c.valueExtension) || "";
            // Not Duplicate
            const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);
            // Check if prop value is a number
            const valueIsNum = /^\d+$/.test(String(classValue));
            // Key & Value exist in dictionary || or use them as is
            const keyCheck = (!notAcceptAny || acceptAnyKey) || inDictionary(dictionary_1.shortKeys, classKey);
            const valueCheck = (!notAcceptAny || acceptAnyValue) || (valueIsNum || inDictionary(dictionary_1.shortValues, classValue));
            if (!isDuplicate && (keyCheck && valueCheck)) {
                // Generate Valid utilityClass
                utilityClasses.push({
                    fullClass: classSelector ? `${singleClass}:${classSelector}` : `${singleClass}`,
                    classKey: ((_d = dictionary_1.shortKeys[classKey]) === null || _d === void 0 ? void 0 : _d.name) || classKey,
                    classValue: `${valueIsNum ? (`${classValue}${extension}`) : (dictionary_1.shortValues[classValue] || classValue)}` // if classKey not abbreviated, use value as is
                });
            }
        }
    });
    return utilityClasses;
};
exports.filterClasses = filterClasses;
const writeCSS = ({ classes, filePath }) => {
    let utilitiesCSS = '';
    // 3 Format utilityClass into .CSS
    classes.forEach(({ fullClass, classKey, classValue }) => {
        utilitiesCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
    });
    // Create the directory if it doesn't exist
    const dir = path_1.default.dirname(filePath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    // 4 Write to File
    fs_1.default.writeFileSync(filePath, utilitiesCSS);
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
function readDir(dir, exclude = []) {
    return fs_1.default.readdirSync(dir, { withFileTypes: true })
        .filter((dirent) => !exclude.includes(dirent.name))
        .flatMap((dirent) => {
        const filePath = path_1.default.join(dir, dirent.name);
        return dirent.isDirectory() ? readDir(filePath, exclude) : filePath;
    });
}
const getFilePaths = (dir) => {
    const { extensions = ["tsx", "ts", "js", "jsx"], exclude = ["node_modules", ".git"] } = readConfigFile();
    let files = [];
    for (const file of readDir(dir, exclude)) {
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
function readConfigFile() {
    const filePath = "./cuconfig.json";
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf8');
        const config = JSON.parse(data);
        return config;
    }
    catch (err) {
        return {};
    }
}
//# sourceMappingURL=helpers.js.map