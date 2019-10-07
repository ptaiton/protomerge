"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
exports.cleanProto = function (proto) {
    return proto
        .replace(/syntax = .*/, '')
        .replace('\n\n', '');
};
exports.resolveImport = function (protoPath, importStatement) {
    var importPath = importStatement.match(/"(.*)"/).slice(-1)[0];
    var importFullPath = path_1.join.apply(void 0, __spreadArrays([protoPath], importPath.split(path_1.sep)));
    return exports.getProtoContent(importFullPath);
};
exports.mergeProtos = function (protos) {
    var baseProto = 'syntax = "proto3";\n';
    return protos.reduce(function (finalProto, proto) { return finalProto + proto; }, baseProto);
};
exports.getProtoContent = function (path) {
    return exports.cleanProto(fs_1.readFileSync(path).toString());
};
