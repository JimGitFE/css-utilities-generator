const commandsList: CommandsMap = {
    'init': { short: "-i", action: [true, 'dist/init.js'] },
    'generate': { short: "-g", action: [true, 'dist/generator.js'] },
    'check': { short: "-c", action: [true, 'dist/check.js'] },
    'watch': { short: "-w", action: [true, 'dist/watch.js'] },
    'help': { short: "-h", action: [false, 'Help\n Available commands:\n- init\n- generate\n- check'] }
};

export default commandsList;