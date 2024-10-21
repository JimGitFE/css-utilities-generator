import * as path from 'path';

/** Paths */
export const getDirectories = () => {
    return {
        package: path.resolve(process.cwd(), "node_modules/css-utilities-generator"),
        user: path.resolve(process.cwd())
    }
} 