/** Mapping from command to executable */
interface CommandsMap {
    [full: string]: { 
        /** Abbreviated command flag */
        short: string, 
        /** [is Executable. Path to executable script] */
        action: [boolean, `dist/cli/command/${string}` | string]
    }
}

/** Abbreviation <=> CSS Property */
interface Dictionary {
    shortKeys: {[key: string]: {name: string; valueExtension: string;}},
    shortValues: {[key: string]: string}
}