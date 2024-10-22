import * as path from 'path';
import * as fs from 'fs';
import { execSync } from "child_process";
import readline from 'readline';

/** Paths */
const getDirectories = () => {
    return {
        package: path.resolve(process.cwd(), "node_modules/css-utilities-generator"), // dirname process [1] ..
        user: path.resolve(process.cwd())
    }
} 

const addScriptToPackageJson = (scriptName: string, scriptCommand: string) => {
    const packageJsonPath = path.resolve(getDirectories().user, 'package.json');

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

const runCommand = (command: string) => {
    try {
        execSync(command, { stdio: "inherit" });
    } catch (error: any) {
        console.error(`Error when executing'${command}' log: ${error.message}`);
        process.exit(1);
    }
};

/** Deprecated */
const installDependencies = (dependencies: string[]) => {
    runCommand(`npm i -D ${dependencies.join("@latest ")}`);
}

function writeFileInRoot(fileName: string,file: any) {    
    fs.writeFileSync(path.resolve(process.cwd(), fileName), JSON.stringify(file, null, 2), 'utf8');
}

function askUser(title: string, reply: string, defaultAnswer: string, callback: (answer: string) => string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Create readline interface
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        // Ask user for file path
        rl.question(title, (filePath) => {
            // Use default if no path provided
            if (!filePath) {
              filePath = defaultAnswer;
            }
            const input = callback(filePath)
            console.log(reply);
            // Rest of your code here...
          
            rl.close();

            resolve(input);
          });
    })
}

function isValidPath(filePath: string): boolean {
    try {
      path.parse(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

export { installDependencies, addScriptToPackageJson, writeFileInRoot, askUser, isValidPath, getDirectories };