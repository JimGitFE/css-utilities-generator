import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to the src directory
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
