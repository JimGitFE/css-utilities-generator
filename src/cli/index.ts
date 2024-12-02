#!/usr/bin/env node
import * as path from 'path';
import { ProcessRetriever, executeFile } from "./utils";
import commandsMap from "./commands";
import { getDirectories } from '../utils';

const cli = new ProcessRetriever(process, commandsMap);

/** Main */
const commandInstance = commandsMap[cli.command() as keyof typeof commandsMap];

if (commandInstance.action[0]) {
    executeFile(path.join(getDirectories().package, commandInstance.action[1]));
} else {
    console.log(commandInstance.action[1]);
}