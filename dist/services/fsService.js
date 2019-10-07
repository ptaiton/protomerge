"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var findPatternToRegex = function (findPattern) {
    var formattedPattern = findPattern
        .replace('.', '\.')
        .replace('*', '.*');
    return new RegExp(formattedPattern, 'g');
};
exports.isDirectory = function (path) {
    return fs_1.lstatSync(path).isDirectory();
};
exports.findInPath = function (path, findPattern) {
    var filesPaths = [];
    var findInDirectory = function (directoryPath) {
        var elements = fs_1.readdirSync(directoryPath);
        elements.forEach(function (element) {
            var elementPath = path_1.join(directoryPath, element);
            if (fs_1.lstatSync(element).isDirectory()) {
                findInDirectory(elementPath);
            }
            else {
                if (element.match(findPatternToRegex(findPattern))) {
                    filesPaths.push({ fileName: element, path: elementPath });
                }
            }
        });
    };
    findInDirectory(path);
    return filesPaths;
};
