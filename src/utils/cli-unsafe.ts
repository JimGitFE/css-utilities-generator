import { pathTo } from "./";
import * as path from 'path';
import * as fs from 'fs';

// /** Deprecated  @deprecated*/
// export const installDependencies = (dependencies: string[]) => {
//   runCommand(`npm i -D ${dependencies.join("@latest ")}`);
// }

/** Write file in user root (dep: initialization of cuconfig.json) */
export function writeFileInRoot(fileName: string,file: any) {    
  fs.writeFileSync(path.resolve(process.cwd(), fileName), JSON.stringify(file, null, 2), 'utf8');
}

/** Execute file */
export const executeScript = (path: string) => {
    const { spawn } = require('child_process');
    const child = spawn('node', [path], { stdio: 'inherit' });
  
    child.on('error', (err: Error) => {
      console.error(`Error executing command: ${err.message}`);
    });
  };

/** Add script to package.json */
export const addScriptToPackageJson = (scriptName: string, scriptCommand: string) => {
   const packageJsonPath = path.resolve(pathTo().user, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
      console.error('package.json not found in the current directory.');
      process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Ensure scripts section exists
  if (!packageJson.scripts) {
      packageJson.scripts = {};
  }

  // Add or update the script
  packageJson.scripts[scriptName] = scriptCommand;

  // Write changes back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log(`Script "${scriptName}" added to package.json.`);
}