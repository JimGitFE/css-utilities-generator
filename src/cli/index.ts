#!/usr/bin/env node
import * as path from 'path';
import { executeScript, pathTo } from "@/utils";
import ProcessRetriever from "./Process";
import commandsMap from "./constants";

const cli = new ProcessRetriever(process, commandsMap);

/** Gets Action for a given user input command (flag) */
const { action } = commandsMap[cli.command()];

if (action[0]) {
    executeScript(path.join(pathTo().package, action[1]));
} else {
    console.log(action[1]);
}