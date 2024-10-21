#!/usr/bin/env node
import * as path from 'path';
import { ProcessRetriever, executeFile } from "./utils";
import commandsMap from "./commandList";

const cli = new ProcessRetriever(process, commandsMap);

/** Main */
const commandInstance = commandsMap[cli.command() as keyof typeof commandsMap];
console.log(process.cwd())
if (commandInstance.action[0]) {
    executeFile(path.join(process.cwd(), commandInstance.action[1]));
} else {
    console.log(commandInstance.action[1]);
}