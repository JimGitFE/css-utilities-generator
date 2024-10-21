"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandsList = {
    'init': { short: "-i", action: [true, '../init.js'] },
    'generate': { short: "-g", action: [true, '../generator.js'] },
    'check': { short: "-c", action: [true, '../check.js'] },
    'help': { short: "-h", action: [false, 'Help\n Available commands:\n- init\n- generate\n- check'] }
};
exports.default = commandsList;
//# sourceMappingURL=commandList.js.map