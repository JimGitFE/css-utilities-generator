
// ### 2. **Automated Script Setup (Optional)**

// If you want to provide a more automated setup, you can write a script that modifies the user's `package.json`. This is a bit more advanced and requires handling user permissions and existing content in the `package.json` file.

// Here’s a basic example of how you might achieve this with a Node.js script:

// **Create a `setup.js` Script:**

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

function addScriptToPackageJson(scriptName, scriptCommand) {
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

const scriptName = 'utils';
const scriptCommand = 'nodemon --watch ./ --ext tsx,ts,js,jsx --exec ts-node node_modules/css-utilities-generator/dist/generator.js';

addScriptToPackageJson(scriptName, scriptCommand);