import { spawn } from 'child_process';
import * as path from 'path';
import { readConfigFile } from './helpers';
import { getDirectories } from './utils';

const { exclude = [], readFrom = "./", extensions = "tsx,ts,js,jsx" } = readConfigFile()

// Spawn the nodemon process
const nodemonProcess = spawn('npx', [
    'nodemon',
    '--watch', readFrom,
    '--ext', extensions,
    '--exec', 'css-utilities-generator generate',
    ...exclude.flatMap(pattern => ['--ignore', pattern])
  ], {
    stdio: 'inherit',
    shell: true,
  });

nodemonProcess.on('error', (err) => {
    console.error(`Failed to start nodemon: ${err.message}`);
});

nodemonProcess.on('exit', (code, signal) => {
    if (code !== null) {
        console.log(`nodemon process exited with code ${code}`);
    } else {
        console.log(`nodemon process was killed with signal ${signal}`);
    }
});