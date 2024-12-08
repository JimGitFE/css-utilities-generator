#!/usr/bin/env node
import * as path from 'path';
import { ProcessRetriever, executeScript } from "./utils";
import commandsMap from "./constants";
import { getDirectories } from '../utils';

const cli = new ProcessRetriever(process, commandsMap);

/** Gets Action for a given user input command (flag) */
const { action } = commandsMap[cli.command()];

if (action[0]) {
    executeScript(path.join(getDirectories().package, action[1]));
} else {
    console.log(action[1]);
}