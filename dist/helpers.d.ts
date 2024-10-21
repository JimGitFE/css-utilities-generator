import * as parser from '@babel/parser';
interface utilityClass {
    fullClass: string;
    classKey: string;
    classValue: string;
}
/** Get the package version from package.json */
declare const packageVersion: () => any;
/** Classes from attributes node
 *
 * @returns {string[]} - Array of classes
 * @example
 * ```ts
 * const class = getClassNames();
 * console.log(class); // d-f jc-sb ai-c h-100 h--spacing-4
 * ```
 */
declare const getClassNames: ({ ast }: {
    ast: parser.ParseResult<File> | any;
}) => string;
/** Classes filter duplicates & utilities dictionary matches
 * @returns {string[]} - Dictionary matched classes
 * @example
 * ```ts
 * const classes = filterClasses(['m-10', 'd-f', 'jc-sb', 'ai-c', 'h-100', 'h--spacing-4']);
 * console.log(classes); // [{fullClass: 'm-10', classKey: 'margin', classValue: '10px'}, ...]
 * ```
 */
declare const filterClasses: (classes: string[]) => utilityClass[];
declare const writeCSS: ({ classes, filePath }: {
    classes: utilityClass[];
    filePath: string;
}) => void;
declare const getFilePaths: (dir: string) => string[];
declare const generateAST: (filePath: string) => parser.ParseResult<File> | any;
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
    extendKeys?: {
        [key: string]: {
            name: string;
            valueExtension: string;
        };
    };
    extendValues?: Record<string, string>;
    /** Must include filename, ex. ./src/styles/utilities.css */
    writeTo?: string;
    readFrom?: string;
    extensions?: string[];
    exclude?: string[];
}
declare function readConfigFile(): Config;
export type { utilityClass };
export { getFilePaths, generateAST, getClassNames, filterClasses, writeCSS, readConfigFile, packageVersion };
//# sourceMappingURL=helpers.d.ts.map