/** Commands to Action, [isExecutable, pathToExecutable | log text] */
const commandsMap: CommandsMap = {
    'init': { short: "-i", action: [true, 'dist/cli/command/init.js'] },
    'generate': { short: "-g", action: [true, 'dist/cli/command/generator.js'] },
    'check': { short: "-c", action: [true, 'dist/cli/command/check.js'] },
    'watch': { short: "-w", action: [true, 'dist/cli/command/watch.js'] },
    'help': { short: "-h", action: [false, 'Help\n Available commands:\n- init\n- generate\n- check'] }
} as const;

export default commandsMap;