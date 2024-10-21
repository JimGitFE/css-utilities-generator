import { spawn } from 'child_process';
import * as path from 'path';
import { readConfigFile } from './helpers';

const { readFrom = "./", extensions = "tsx,ts,js,jsx" } = readConfigFile()

// Spawn the nodemon process
const nodemonProcess = spawn('npx', [
    'nodemon',
    '--watch', path.resolve(readFrom, "../.."),
    '--ext', extensions,
    '--exec', 'css-utilities-generator generate'
  ], {
    stdio: 'inherit'
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