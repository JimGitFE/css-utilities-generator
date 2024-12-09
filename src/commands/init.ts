#!/usr/bin/env node
import chalk from "chalk";
// Local
import { askUser, isValidPath } from "../utils/cli";
import { addScriptToPackageJson, writeFileInRoot } from "../utils/cli-unsafe";

/** Default configuration */
let cuconfig = {
    acceptAnyVariable: false,
    acceptAnyValue: true,
    readFrom: "./",
    writeTo: "./styles/utilities.css",
    extensions: "tsx,ts,js,jsx",
    exclude: ["node_modules", ".git", ".*/**/*"],
};

/** Installation Walkthrough
 *
 * 1 Add script to package.json
 * 2 Generate config file
 * 3 CSS Utilities Explanation
 */
(async () => {
    /* 1 Add script to package.json */

    addScriptToPackageJson("utils", "css-utils watch");

    console.log("\n");

    /* 2 Generate config file */

    const watchPath = await askUser(
        `Watch for on save changes at path ${chalk.yellow.dim.italic(`(default: ${"./"})`)}: `,
        "",
        "",
        (userInput) => {
            if (userInput && isValidPath(userInput)) {
                console.log(`${chalk.gray(`Changing watch path to `)}${chalk.white.italic.bold(userInput)} \n`);
                return userInput;
            } else {
                console.log(`${chalk.gray(`Watch path defaulted to `)}${chalk.white.italic.bold("./")} \n`);
                return cuconfig.readFrom;
            }
        }
    );
    cuconfig.readFrom = watchPath; // Update cuconfig

    const writePath = await askUser(
        `CSS file destination ${chalk.yellow.dim.italic(`(default: ${cuconfig.writeTo})`)}: `,
        "",
        "",
        (userInput) => {
            if (userInput && isValidPath(userInput)) {
                console.log(`${chalk.gray(`Changing CSS file destination to `)}${chalk.white.italic.bold(userInput)} \n`);
                return userInput;
            } else {
                console.log(`${chalk.gray(`CSS file destination defaulted to `)}${chalk.white.italic.bold(cuconfig.writeTo)} \n`);
                return cuconfig.writeTo;
            }
        }
    );
    cuconfig.writeTo = writePath; // Update cuconfig

    await writeFileInRoot("cuconfig.json", cuconfig);
    console.log(chalk.gray(`Cuconfig added Successfully \n`));

    /* 3 Generate CSS Utilities Explanation */

    console.log(`Congratulations! to generate css utilities on save follow: \n`);
    console.log(`    ${chalk.cyan.bgBlack.bold("npm run utils")} \n`);
    console.log(`    or ${chalk.cyan.bgBlack.bold("npx css-utils generate")} for one time generation \n`);
    console.log(
        `    ${chalk.yellow.dim.italic(`Important!`)} ${chalk.bold(
            `Import ${cuconfig.writeTo} at your main HTML/JavaScript/TypeScript file`
        )} \n`
    );
})();
