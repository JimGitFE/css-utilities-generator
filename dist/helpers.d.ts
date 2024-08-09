import * as parser from '@babel/parser';
interface utilityClass {
    fullClass: string;
    classKey: string;
    classValue: string;
}
/**
 * Log Version at console
 * npm run utils
 */
declare const watchWelcome: () => void;
/** Classes from attributes node
 *
 * @returns {string[]} - Array of classes
 * @example
 * ```ts
 * const class = extractClasses();
 * console.log(class); // d-f jc-sb ai-c h-100 h--spacing-4
 * ```
 */
declare const extractClasses: ({ ast }: {
    ast: parser.ParseResult<File> | any;
}) => string[];
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
export declare class ProcessRetriever {
    private args;
    constructor(process: NodeJS.Process);
    get(flagName: string): undefined;
}
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
    writeTo?: string;
    readFrom?: string;
    extensions?: string[];
    exclude?: string[];
}
declare function readConfigFile(): Config;
export type { utilityClass };
export { getFilePaths, generateAST, extractClasses, filterClasses, writeCSS, readConfigFile, watchWelcome };
//# sourceMappingURL=helpers.d.ts.map