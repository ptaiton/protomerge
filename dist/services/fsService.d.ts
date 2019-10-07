interface IFilePath {
    fileName: string;
    path: string;
}
export declare const isDirectory: (path: string) => boolean;
export declare const findInPath: (path: string, findPattern: string) => IFilePath[];
export declare const getProjectRootPath: () => string;
export {};
