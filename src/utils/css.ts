import path from 'path';
import fs from 'fs';
import parser from '@babel/parser';
import traverse from "@babel/traverse";
// Local
import { shortKeys, shortValues } from '@/constants';

export interface utilityClass {
    fullClass: string, // The raw input class name, ex. 'm-10'
    classKey: string, // The full CSS property key, ex. ['m', margin]
    classValue: string // The full CSS property value, ex. [10, '10px']
}

/** Get classes from className attribute of ast node 
 * 
 * @returns {string[]} - Array of classes
 * @example
 * ```ts
 * const class = getClassNames();
 * console.log(class); // d-f jc-sb ai-c h-100 h--spacing-4
 * ```
 */
export function getClassNames ({ast}: {ast: parser.ParseResult<File> | any}): string {
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
          }
        },
    });
    
    return allClasses;
}

/** Check if key exists in dictionary
 * @returns {boolean} - If key exists in dictionary
 * 
 * @example
 * ```ts
 * const inDict = inDictionary(shortKeys, 'm');
 * console.log(inDict); // true
 * ```
 */
export function inDictionary(dictionary: Dictionary["shortKeys"] | Dictionary["shortValues"], shortKey: string): boolean  {
  return Object.keys(dictionary).includes(shortKey);
}

/** Filter classes for duplicates & dictionary matches
 * 
 * @returns {string[]} - Dictionary matched classes
 * @example
 * ```ts
 * const classes = filterClasses(['m-10', 'd-f', 'jc-sb', 'ai-c', 'h-100', 'h--spacing-4']);
 * console.log(classes); // [{fullClass: 'm-10', classKey: 'margin', classValue: '10px'}, ...]
 * ```
 */
export function filterClasses (classes: string[]): utilityClass[] {
    const {acceptAnyVariable = false, acceptAnyKey = false, acceptAnyValue = true} = readConfigFile()
    let utilityClasses: utilityClass[] = [];
  
    /** @example ["m-1.6:hover", "m", "1.6"] */
    const utilClassReg:RegExp = /^([a-zA-Z]+)-(\w+|[0-9.%]+)(?:-([a-zA-Z]+))?$/
    /** @example ["h--spacing-4", "h", "spacing-4"] */
    const utilVarValReg: RegExp = /^(\w+)--([\w-]+)$/

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
          const valueCheck = (acceptAnyVariable || acceptAnyKey) || (inDictionary(shortKeys, classKey))
          
          if (!isDuplicate && (valueCheck)) {
            // Generate Valid utilityClass
            utilityClasses.push({
              fullClass: singleClass,
              classKey: shortKeys[classKey]?.name || classKey,
              classValue: `var(--${classValue})`
            })
          }
        } else if (matchClass) {
        const [ classKey, classValue, classSelector ] =  [matchClass[1], matchClass[2], matchClass[3]]
        
        // Unit extension if applicable, "px" - "px solid" - "%" - ""
        const unitFromFullKey = Object.values(shortKeys).find(k=>k.name === classKey)?.valueExtension
        const extension = unitFromFullKey || shortKeys[classKey]?.valueExtension || ""

        // Not Duplicate
        const isDuplicate = utilityClasses.some((p) => p.fullClass === singleClass);

        // Check if prop value is a number
        const valueIsNum = /^\d+$/.test(String(classValue))
        
        // Key & Value exist in dictionary || or use them as is
        const keyCheck = (acceptAnyVariable || acceptAnyKey) || inDictionary(shortKeys, classKey)
        const valueCheck = (acceptAnyVariable || acceptAnyValue) || (valueIsNum || inDictionary(shortValues, classValue))

        
        if (!isDuplicate && (keyCheck && valueCheck)) {
            // Generate Valid utilityClass
            utilityClasses.push({
            fullClass: classSelector?`${singleClass}:${classSelector}`:`${singleClass}`,
            classKey: shortKeys[classKey]?.name || classKey,
            classValue: `${valueIsNum?(`${classValue}${extension}`):(shortValues[classValue] || classValue)}` // if classKey not abbreviated, use value as is
            })
        }
        }
    });

    return utilityClasses;
}

export function writeCSS ({classes, filePath}: {classes: utilityClass[], filePath: string}) {
    let utilitiesCSS: string = '';

    // 3 Format utilityClass into .CSS
    classes.sort((a, b) => a.fullClass.localeCompare(b.fullClass)).forEach(({ fullClass, classKey, classValue }) => {
      utilitiesCSS += `.${fullClass} { ${classKey}: ${classValue}; }\n`;
    });
    // Create the directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 4 Write to File
    fs.writeFileSync(filePath, utilitiesCSS);
}

export function readDir(dir: string, exclude: string[] = []): any {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((dirent: fs.Dirent) => !exclude.includes(dirent.name))
    .flatMap((dirent: fs.Dirent) => {
      const filePath = path.join(dir, dirent.name);
      return dirent.isDirectory() ? readDir(filePath, exclude) : filePath;
    });
}

export function getFilePaths (dir: string): string[]  {
    const {extensions = "tsx,ts,js,jsx", exclude = ["node_modules", ".git"]} = readConfigFile()
    
    let files: string[] = [];
    for (const file of readDir(dir, exclude)) {
      if (extensions.split(",").some(ext => file.endsWith(ext))) {
          files.push(file.replace(/\\/g, '/'));
      }
    }
    
    return files;
}

export function generateAST (filePath: string): parser.ParseResult<File> | any {
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
  acceptAnyVariable?: boolean;
  acceptAnyKey?: boolean;
  /**
   * Accept (value + unit) or any value
  */
  acceptAnyValue?: boolean;
  units?: "px" | "rem" | "em" | "vh" | "vw" | "vmin" | "vmax" | "%";
  extendKeys?: {[key:string]:{name: string, valueExtension: string}};
  extendValues?: Record<string, string>;
  /** Must include filename, ex. ./src/styles/utilities.css */
  writeTo?: string;
  readFrom?: string;
  // Files to be interpreted, have this extensions
  extensions?: string;
  exclude?: string[];
}

export function readConfigFile(): Config {
  const filePath = "./cuconfig.json";
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    return {};
  }
}