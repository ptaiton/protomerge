"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogColors_1 = require("../types/LogColors");
var toColor = function (message, color) { return color + message + LogColors_1.LogColors.RESET; };
exports.info = function (message) {
    console.log(message);
};
exports.error = function (pre, message, post) {
    if (pre === void 0) { pre = ''; }
    if (post === void 0) { post = ''; }
    console.log(pre, toColor(message, LogColors_1.LogColors.FG_RED), post);
};
exports.success = function (pre, message, post) {
    if (pre === void 0) { pre = ''; }
    if (post === void 0) { post = ''; }
    console.log(pre, toColor(message, LogColors_1.LogColors.FG_GREEN), post);
};
