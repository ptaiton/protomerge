#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var fsService_1 = require("./services/fsService");
var Log = require("./utils/logger");
var proto_1 = require("./utils/proto");
var argvParser_1 = require("./utils/argvParser");
var args = argvParser_1.parseArgv();
if (args.path && args.out) {
    var path_2 = path_1.isAbsolute(args.path) ? args.path : path_1.join(fsService_1.getProjectRootPath(), args.path);
    var out_1 = path_1.isAbsolute(args.out) ? args.out : path_1.join(fsService_1.getProjectRootPath(), args.out);
    var domains = fs_1.readdirSync(path_2);
    domains.forEach(function (domain) {
        var pathToProto = path_1.join(path_2, domain, domain + "-api");
        if (fs_1.existsSync(pathToProto)) {
            Log.info("Domain: " + domain);
            var toMerge_1 = [];
            fs_1.readdirSync(pathToProto).forEach(function (element) {
                if (!fsService_1.isDirectory(path_1.join(pathToProto, element))) {
                    var servicePath = path_1.join(pathToProto, element);
                    var protoService_1 = proto_1.getProtoContent(servicePath);
                    var importStatements = protoService_1.match(/import ".*";/g) || [];
                    importStatements.forEach(function (importStatement) {
                        var protoImported = proto_1.resolveImport(path_2, importStatement);
                        var mergedProto = protoService_1.replace(importStatement, protoImported);
                        toMerge_1.push(mergedProto);
                    });
                }
            });
            if (toMerge_1.length > 1) {
                var protoMerged = proto_1.mergeProtos(toMerge_1);
                var protoPath = path_1.join(out_1, domain + ".proto");
                fs_1.writeFileSync(protoPath, protoMerged);
                Log.success('', 'Successfully merged');
            }
        }
    });
}
else {
    Log.error('', 'Invalid command');
    Log.info('Usage: protomerge --path path/to/domain --out path/to/output');
}
