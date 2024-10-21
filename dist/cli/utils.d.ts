/** Command Reader */
export declare class ProcessRetriever {
    private args;
    private commandsMap;
    constructor(process: NodeJS.Process, commandsMap: CommandsMap);
    /** Main Command */
    command(): keyof typeof this.commandsMap;
    /** Flag */
    get(flagName: string): undefined;
}
/** Execute file */
export declare const executeFile: (path: string) => void;
//# sourceMappingURL=utils.d.ts.map