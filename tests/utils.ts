const fs = require('fs');
const path = require('path');

const defaultJSON = `{
    "onlyDictionary": true,
    "units": "rem",
    "extendKeys": 
    {
        "fs": {"name": "font-size", "valueExtension": "abc"},
        "fi": {"name": "filter", "valueExtension": ""}
    },
    "writeTo": "src/styles/utilities.css",
    "readFrom": "src/"
}`

export function createConfigFile(content: string) {  
    // Construct the path to the root directory
    const rootDir = path.resolve(__dirname, '../..');
    
    // Construct the path to the config file
    const configPath = path.join(rootDir, 'cuconfig.json');

    const data = JSON.stringify(content, null, 2);

    fs.writeFileSync(configPath, data);
}

export function deleteConfigFile() {
  // Construct the path to the root directory
  const rootDir = path.resolve(__dirname, '../..');

  // Construct the path to the config file
  const configPath = path.join(rootDir, 'cuconfig.json');

  // Check if the file exists before trying to delete it
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  } else {
    console.log('File does not exist');
  }
}