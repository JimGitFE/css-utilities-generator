import * as parser from '@babel/parser';
interface utilityClass {
    fullClass: string;
    classKey: string;
    classValue: string;
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
declare const writeCSS: ({ classes, dir }: {
    classes: utilityClass[];
    dir: string;
}) => void;
export declare class ProcessRetriever {
    private args;
    constructor(process: NodeJS.Process);
    get(flagName: string): undefined;
}
declare const getFilePaths: (dir: string, extensions?: string[]) => string[];
declare const generateAST: (filePath: string) => parser.ParseResult<File> | any;
export type { utilityClass };
export { getFilePaths, generateAST, extractClasses, filterClasses, writeCSS };
//# sourceMappingURL=helpers.d.ts.map