"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeFile = exports.ProcessRetriever = void 0;
/** Command Reader */
class ProcessRetriever {
    constructor(process, commandsMap) {
        this.args = process.argv.slice(2);
        console.log(process.argv);
        this.commandsMap = commandsMap;
    }
    /** Main Command */
    command() {
        const main = this.args[0]; // Main Arg command
        const fulls = Object.keys(this.commandsMap);
        const shorts = Object.values(this.commandsMap).map(c => c.short);
        if (shorts.includes(main)) {
            return this.commandsMap[main].short;
        }
        else if (fulls.includes(main)) {
            return main;
        }
        console.error(`Available commands: ${fulls.join(', ')}`);
        process.exit(1);
    }
    /** Flag */
    get(flagName) {
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
exports.ProcessRetriever = ProcessRetriever;
/** Execute file */
const executeFile = (path) => {
    const { spawn } = require('child_process');
    const child = spawn('node', [path], { stdio: 'inherit' });
    child.on('error', (err) => {
        console.error(`Error executing command: ${err.message}`);
    });
};
exports.executeFile = executeFile;
//# sourceMappingURL=utils.js.map