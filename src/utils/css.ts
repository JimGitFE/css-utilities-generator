import path from 'path';
import fs from 'fs';
import parser from '@babel/parser';
import traverse from "@babel/traverse";
// Local
import { shortKeys, shortValues } from '@/constants';
import { readUserConfig } from '@/utils';

/**
 * 1 Return absolute paths to all files with matching extensions from user config.
 *
 * @param dir - The directory to search for files.
 * @returns An array of absolute paths to files with matching extensions.
 *
 * @example
 * ```typescript
 * const filePaths = getFilePaths('/path/to/directory');
 * console.log(filePaths);
 * // Output: ['/path/to/directory/file1.ts', '/path/to/directory/file2.js', ...]
 * ```
 */
export function getFilePaths (dir: string): string[]  {
  const {extensions = "tsx,ts,js,jsx", exclude = ["node_modules", ".git"]} = readUserConfig()
  
  function readDir(dir: string, exclude: string[] = []): any {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((dirent: fs.Dirent) => !exclude.includes(dirent.name))
      .flatMap((dirent: fs.Dirent) => {
        const filePath = path.join(dir, dirent.name);
        return dirent.isDirectory() ? readDir(filePath, exclude) : filePath;
      });
  }

  let files: string[] = [];
  for (const file of readDir(dir, exclude)) {
    if (extensions.split(",").some(ext => file.endsWith(ext))) {
        files.push(file.replace(/\\/g, '/'));
    }
  }
  
  return files;
}

/**
 * 2 Parse the provided tsx code as an entire ECMAScript program into AST.
 *
 * @param filePath - The path to the file to be parsed.
 * @returns The Abstract Syntax Tree (AST) of the parsed code.
 *
 * @example
 * ```typescript
 * import { generateAST } from './path/to/css';
 * import * as parser from '@babel/parser';
 * import * as fs from 'fs';
 *
 * // Example file path
 * const filePath = './path/to/file.tsx';
 *
 * // Generate the AST
 * const ast = generateAST(filePath);
 *
 * // Output the AST
 * console.log(JSON.stringify(ast, null, 2));
 * ```
 */
export function generateAST (filePath: string): parser.ParseResult<File> | any {
  const code = fs.readFileSync(filePath, 'utf-8');

  // Parse the code
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });
}

/** 3 Get classes from className attribute of ast node 
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

/** 4 Check if class key exists in dictionary
 * @returns {boolean} - If key exists in dictionary
 * 
 * @example
 * ```ts
 * const inDict = inDictionary(shortKeys, 'm');
 * console.log(inDict); // true
 * ```
 */
function inDictionary(dictionary: Dictionary["shortKeys"] | Dictionary["shortValues"], shortKey: string): boolean  {
  return Object.keys(dictionary).includes(shortKey);
}

interface utilityClass {
  /** The raw input class name, ex. 'm-10' */
  fullClass: string, 
  /** The full CSS property key, ex. ['m', margin] */
  classKey: string, 
  /** The full CSS property value, ex. [10, '10px'] */
  classValue: string 
}

/** 5 Filter classes for duplicates & dictionary matches utilityClass
 * 
 * @returns {utilityClass[]} - Dictionary matched classes as utilityClass
 * @example
 * ```ts
 * const classes = filterClasses(['m-10', 'd-f', 'jc-sb', 'ai-c', 'h-100', 'h--spacing-4']);
 * console.log(classes); // [{fullClass: 'm-10', classKey: 'margin', classValue: '10px'}, ...]
 * ```
 */
export function filterClasses (classes: string[]): utilityClass[] {
    const {acceptAnyVariable = false, acceptAnyKey = false, acceptAnyValue = true} = readUserConfig()
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

/** 6 Write CSS file from utilityClass[]
 * 
 * @example
 * ```ts
 * writeCSS({classes, filePath: writeTo})
 * ```
 *  Writes to utilities.css
 * ```css
 * .m-10 { margin: 10px; }
 * .d-f { display: flex; }
 * ```
 */
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