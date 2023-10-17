"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = require("./config/default");
const init = require("../../utils/lib/module_initialiser/initModules");
const initModules = init.default.initVersion(default_1.default.modules);
module.exports = {
    initModules,
};
