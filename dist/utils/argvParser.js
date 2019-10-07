"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgv = function () {
    var argv = process.argv;
    console.log(argv);
    var lastKey = '';
    return argv.reduce(function (acc, arg) {
        if (arg.startsWith('-')) {
            var key = arg.replace(/^-+/, '');
            lastKey = key;
            acc[key] = '';
        }
        else {
            acc[lastKey] = arg;
        }
        return acc;
    }, {});
};
