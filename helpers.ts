import path from 'path';
import fs from 'fs';
import * as parser from '@babel/parser';
import traverse from "@babel/traverse";
import { shortKeys, shortValues } from './dictionary';

interface utilityClass {
    fullClass: string, // The raw input class name, ex. 'm-10'
    classKey: string, // The full CSS property key, ex. ['m', margin]
    classValue: string // The full CSS property value, ex. [10, '10px']
}

/** Classes from attributes node 
 * 
 * @returns {string[]} - Array of classes
 * @example
 * ```ts
 * const class = extractClasses();
 * console.log(class); // d-f jc-sb ai-c h-100 h--spacing-4
 * ```
 */
const extractClasses = ({ast}: {ast: parser.ParseResult<File> | any}): string[] => {
    let classes: string[] = [];
    let allClasses: string = '';

    // 1 Traverse the AST (Abstract Syntax Tree)
    traverse(ast, {

        // 2 Loop attributes
        JSXAttribute(path) {

        // 3 Match className attributes
        if (path.node.name.name === 'className') {
            const nodeValue = path.node.value;
            
            // Return class
            let nodeClass = () => {
              if (nodeValue && nodeValue.type === 'StringLiteral') {
                  return (nodeValue.value);

              } else if (nodeValue && nodeValue.type === 'JSXExpressionContainer') {
                // If the className is a JSX expression
                const { expression } = nodeValue;
                if (expression.type === 'TemplateLiteral') {
                  // If the expression is a template literal
                  return expression.quasis.map(quasi => quasi.value.raw).join(" ")
                }
              }
            }
            
            // 4 format into array of string classes
            allClasses += nodeClass() + " ";
            allClasses.slice(0, -1)
            classes = allClasses.split(' ');
          }
        },
    });

    return classes;
}
  

function inDictionary(dictionary: Record<string, any>, shortKey: string): boolean {
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
const filterClasses = (classes: string[]): utilityClass[] => {  
    const {onlyDictionary: notAcceptAny, acceptAnyKey, acceptAnyValue} = readConfigFile()
    let utilityClasses: utilityClass[] = [];
  
    /** @example ["h--spacing-4", "h", "spacing-4"] */
    const utilVarValReg: RegExp = /^(\w+)--([\w-]+)$/
    /** @example ["m-1.6", "m", "1.6"] */
    const utilClassReg:RegExp = /^([a-zA-Z]+)-(\w+|[0-9.%]+)$/

    // Remove duplicate & non dictionary classes
    classes.forEach(singleClass => {

        // Utility Dictionary Match
        const matchClass: RegExpMatchArray | null = singleClass.match(utilClassReg) // word-word|number
        const matchVariable: RegExpMatchArray | null = singleClass.match(utilVarValReg)
        if (matchVariable) {
          const [ classKey, classValue ] =  [matchVariable[1], matchVariable[2]]

          // Not Duplicate
          const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);

          // Key exist in dictionary
          const valueCheck = (!notAcceptAny || acceptAnyKey) || (inDictionary(shortKeys, classKey))
          
          if (!isDuplicate && (valueCheck)) {
            // Generate Valid utilityClass
            utilityClasses.push({
              fullClass: singleClass,
              classKey: shortKeys[classKey]?.name || classKey,
              classValue: `var(--${classValue})`
            })
          }
        } else if (matchClass) {
        const [ classKey, classValue ] =  [matchClass[1], matchClass[2]]
        
        // Unit extension if applicable, "px" - "px solid" - "%" - ""
        const unitFromFullKey = Object.values(shortKeys).find(k=>k.name === classKey)?.valueExtension
        const extension = unitFromFullKey || shortKeys[classKey]?.valueExtension || ""

        // Not Duplicate
        const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);

        // Check if prop value is a number
        const valueIsNum = /^\d+$/.test(String(classValue))
        
        // Key & Value exist in dictionary || or use them as is
        const keyCheck = (!notAcceptAny || acceptAnyKey) || inDictionary(shortKeys, classKey)
        const valueCheck = (!notAcceptAny || acceptAnyValue) || (valueIsNum || inDictionary(shortValues, classValue))

        
        if (!isDuplicate && (keyCheck && valueCheck)) {
            // Generate Valid utilityClass
            utilityClasses.push({
            fullClass: singleClass,
            classKey: shortKeys[classKey]?.name || classKey,
            classValue: `${valueIsNum?(`${classValue}${extension}`):(shortValues[classValue] || classValue)}` // if classKey not abbreviated, use value as is
            })
        }
        }
    });

    return utilityClasses;
}

const writeCSS = ({classes, dir}: {classes: utilityClass[], dir: string}) => {
    let utilitiesCSS: string = '';

    // 3 Format utilityClass into .CSS
    classes.forEach(({ fullClass, classKey, classValue }) => {
      utilitiesCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
    });

    // Create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 4 Write to File
    fs.writeFileSync(dir, utilitiesCSS);
}

export class ProcessRetriever {
    private args: string[];

    constructor(process: NodeJS.Process) {
        this.args = process.argv.slice(2);
    }

    get(flagName: string) {
        let flagValue;
        this.args.forEach((arg, index) => {
            if (arg === `--${flagName}`) {
                flagValue = this.args[index + 1];
            }
        });
        return flagValue;
    }
}


function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const getFilePaths = (dir: string, extensions: string[] = ["tsx", "ts", "js", "jsx"]): string[] => {
    let files: string[] = [];
    for (const file of readAllFiles(dir)) {
      if (extensions.some(ext => file.endsWith(ext))) {
          files.push(file.replace(/\\/g, '/'));
      }
    }
    
    return files;
}

const generateAST = (filePath: string): parser.ParseResult<File> | any => {
  const code = fs.readFileSync(filePath, 'utf-8');

  // Parse the code
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
}

interface Config {
  /**
   * Only accept classes that are in the dictionary and number values or directory variables
  */
  onlyDictionary?: boolean;
  acceptAnyKey?: boolean;
  /**
   * Accept (value + unit) or any value
  */
  acceptAnyValue?: boolean;
  units?: "px" | "rem" | "em" | "vh" | "vw" | "vmin" | "vmax" | "%";
  extendKeys?: {[key:string]:{name: string, valueExtension: string}};
  extendValues?: Record<string, string>;
  writeTo?: string;
  readFrom?: string;
}

function readConfigFile(): Config {
  const filePath = "./cuconfig.json";
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    return {};
  }
}

export type { utilityClass }
export { getFilePaths, generateAST, extractClasses, filterClasses, writeCSS, readConfigFile }