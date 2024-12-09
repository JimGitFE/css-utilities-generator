import path from 'path';
import fs from 'fs';
import readline from 'readline';

/** Absolute paths from user to root | package */
export function pathTo() {
    return {
        package: path.resolve(process.cwd(), "node_modules/css-utilities-generator"), // dirname process [1] ..
        user: path.resolve(process.cwd())
    }
} 

/** css-utilities-generator version from package.json */
export function packageVersion () {
    return JSON.parse(fs.readFileSync(path.resolve(pathTo().package, 'package.json'), 'utf8')).version
  }

/** Ask user for input (dep at init.ts) */
export function askUser(title: string, reply: string, defaultAnswer: string, callback: (answer: string) => string): Promise<string> {
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

/** Validate user input as path */
export function isValidPath(filePath: string): boolean {
    try {
      path.parse(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

/** Return parsed user config from cuconfig.json */
export function readUserConfig(): Config {
  const filePath = "./cuconfig.json";
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    return {};
  }
}

//   /** deprecated with install dep */
// const runCommand = (command: string) => {
//     try {
//         execSync(command, { stdio: "inherit" });
//     } catch (error: any) {
//         console.error(`Error when executing'${command}' log: ${error.message}`);
//         process.exit(1);
//     }
// };