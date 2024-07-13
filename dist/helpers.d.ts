import * as parser from '@babel/parser';
interface utilityClass {
    fullClass: string;
    classKey: string;
    classValue: string;
}
/** Classes from attributes node */
declare const extractClasses: ({ ast }: {
    ast: parser.ParseResult<File> | any;
}) => string[];
/** Classes filter duplicates & utilities dictionary matches
 * @returns {string[]} - Dictionary matched classes
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