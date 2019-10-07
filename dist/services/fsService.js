"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
exports.isDirectory = function (path) {
    return fs_1.lstatSync(path).isDirectory();
};
