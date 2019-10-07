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
exports.cleanProto = function (protoContent) {
    return protoContent
        .replace(/^syntax = .*;/gm, '')
        .replace(/^package .*;/gm, '')
        .replace(/^option java_package = .*;/gm, '')
        .replace(/\n\n*/g, '\n');
};
exports.getProtoInfos = function (protoContent) {
    var syntaxMatched = protoContent.match(/^syntax = .*;/gm);
    var packageMatched = protoContent.match(/^package .*;/gm);
    var javaPackageMatched = protoContent.match(/^option java_package = .*;/gm);
    return {
        syntax: syntaxMatched ? syntaxMatched[0] : null,
        package: packageMatched ? packageMatched[0] : null,
        javaPackage: javaPackageMatched ? javaPackageMatched[0] : null,
    };
};
exports.resolveImport = function (protoPath, importStatement) {
    var importPath = importStatement.match(/"(.*)"/).slice(-1)[0];
    var importFullPath = path_1.join.apply(void 0, __spreadArrays([protoPath], importPath.split(path_1.sep)));
    return exports.cleanProto(exports.getProtoContent(importFullPath));
};
exports.mergeProtos = function (proto, protos) {
    var baseProto = Object.values(proto)
        .filter(function (v) { return v; })
        .reduce(function (acc, v) { return "" + acc + v + "\n"; }, '');
    return protos.reduce(function (finalProto, proto) { return finalProto + proto; }, baseProto);
};
exports.getProtoContent = function (path) {
    return fs_1.readFileSync(path).toString();
};
