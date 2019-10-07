"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogColors_1 = require("../types/LogColors");
exports.info = function (message) {
    console.log(message);
};
exports.error = function (pre, message, post) {
    if (pre === void 0) { pre = ''; }
    if (post === void 0) { post = ''; }
    console.log(pre, LogColors_1.LogColors.FG_RED, message, post);
};
exports.success = function (pre, message, post) {
    if (pre === void 0) { pre = ''; }
    if (post === void 0) { post = ''; }
    console.log(pre, LogColors_1.LogColors.FG_GREEN, message, post);
};
