export interface IProtoInfos {
    syntax?: string;
    package?: string;
    javaPackage?: string;
}
export declare const cleanProto: (protoContent: string) => string;
export declare const getProtoInfos: (protoContent: string) => IProtoInfos;
export declare const resolveImport: (protoPath: string, importStatement: string) => string;
export declare const mergeProtos: (proto: IProtoInfos, protos: string[]) => any;
export declare const getProtoContent: (path: string) => string;
