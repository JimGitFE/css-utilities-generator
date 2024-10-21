import * as path from 'path';

/** Paths */
export const getDirectories = () => {
    return {
        package: path.resolve(__dirname, '..'),
        user: path.resolve(process.cwd())
    }
} 