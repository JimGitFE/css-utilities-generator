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

// 1 Add script to package.json
addScriptToPackageJson("utils", "nodemon");

// 2 Add nodemon.json
const nodemonJson = {
    "watch": ["./"], 
    "ext": "tsx,ts,js,jsx", 
    "exec": "node node_modules/css-utilities-generator/dist/generator.js",
    "ignore": ["node_modules/**/*", ".*/**/*"]
  }
fs.writeFileSync(path.resolve(process.cwd(), 'nodemon.json'), JSON.stringify(nodemonJson, null, 2), 'utf8');