const commandsMap: CommandsMap = {
    'init': { short: "-i", action: [true, 'dist/cli/init.js'] },
    'generate': { short: "-g", action: [true, 'dist/cli/generator.js'] },
    'check': { short: "-c", action: [true, 'dist/cli/check.js'] },
    'watch': { short: "-w", action: [true, 'dist/cli/watch.js'] },
    'help': { short: "-h", action: [false, 'Help\n Available commands:\n- init\n- generate\n- check'] }
};

export default commandsMap;