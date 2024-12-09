import * as fs from "fs";

// src/utils/math.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;

/** Return parsed user config from cuconfig.json */
export function readUserConfig(): Config {
    const filePath = "./cuconfig.json";
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const config = JSON.parse(data);
        return config;
    } catch (err) {
        return {};
    }
}
