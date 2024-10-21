/** Command Reader */
export class ProcessRetriever {
    private args: string[];
    private commandsMap: CommandsMap;

    constructor(process: NodeJS.Process, commandsMap: CommandsMap) {
        this.args = process.argv.slice(2);
        this.commandsMap = commandsMap;
    }

    /** Main Command */
    command(): keyof typeof this.commandsMap {
        const main = this.args[0]; // Main Arg command
        const fulls = Object.keys(this.commandsMap);
        const shorts = Object.values(this.commandsMap).map(c=>c.short);
        
        if (shorts.includes(main)) {
            return Object.entries(this.commandsMap).find(([key, value]) => value.short === main)![0]
        } else if (fulls.includes(main)) {
            return main;
        }

        console.error(`Available commands: ${fulls.join(', ')}`);
        process.exit(1);
    }

    /** Flag */
    get(flagName: string) {
        let flagValue;
        const flags = this.args.slice(1);

        flags.forEach((arg, index) => {
            if (arg === `--${flagName}`) {
                flagValue = this.args[index + 1];
            }
        });
        return flagValue;
    }
}

/** Execute file */
export const executeFile = (path: string) => {
    const { spawn } = require('child_process');
    const child = spawn('node', [path], { stdio: 'inherit' });
  
    child.on('error', (err: Error) => {
      console.error(`Error executing command: ${err.message}`);
    });
  };