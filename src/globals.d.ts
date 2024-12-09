/** Mapping from command to executable */
interface CommandsMap {
    [full: string]: { 
        /** Abbreviated command flag */
        short: string, 
        /** [is Executable. Path to executable script] */
        action: [boolean, `dist/commands/${string}` | string]
    }
}

/** Abbreviation <=> CSS Property */
interface Dictionary {
    shortKeys: {[key: string]: {name: string; valueExtension: string;}},
    shortValues: {[key: string]: string}
}

/** users cuconfig.json */
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