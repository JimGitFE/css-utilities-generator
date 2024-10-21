import * as path from 'path';

/** Paths */
export const getDirectories = () => {
    return {
        package: path.resolve(process.cwd(), "node_modules/css-utilities-generator"), // dirname process [1] ..
        user: path.resolve(process.cwd())
    }
} 