#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var fsService_1 = require("./services/fsService");
var protoModifierService_1 = require("./services/protoModifierService");
var argvService_1 = require("./services/argvService");
var args = argvService_1.parseArgv();
if (args.path && args.out) {
    var domains = fs_1.readdirSync(args.path);
    domains.forEach(function (domain) {
        var pathToProto = path_1.join(args.path, domain, domain + "-api");
        if (fs_1.existsSync(pathToProto)) {
            var toMerge_1 = [];
            fs_1.readdirSync(pathToProto).forEach(function (element) {
                if (!fsService_1.isDirectory(path_1.join(pathToProto, element))) {
                    var servicePath = path_1.join(pathToProto, element);
                    var protoService_1 = protoModifierService_1.getProtoContent(servicePath);
                    var importStatements = protoService_1.match(/import ".*";/g) || [];
                    importStatements.forEach(function (importStatement) {
                        var protoImported = protoModifierService_1.resolveImport(args.path, importStatement);
                        var mergedProto = protoService_1.replace(importStatement, protoImported);
                        toMerge_1.push(mergedProto);
                    });
                }
            });
            if (toMerge_1.length > 1) {
                var protoMerged = protoModifierService_1.mergeProtos(toMerge_1);
                var out = path_1.join(args.out, domain + ".proto");
                fs_1.writeFileSync(out, protoMerged);
            }
        }
    });
    console.log('finished');
}
else {
    console.log('Invalid command');
    console.log('Usage: protomerge --path path/to/domain --out path/to/output');
}
