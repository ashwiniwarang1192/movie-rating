"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hooks = void 0;
/* eslint-disable import/no-import-module-exports */
const cors_1 = require("./cors");
const hooks = {
    auth: [cors_1.cors],
    cors: [cors_1.cors],
};
exports.hooks = hooks;
