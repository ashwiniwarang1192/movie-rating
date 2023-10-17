"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-import-module-exports */
const default_1 = require("./config/default");
const routes_1 = require("./routes");
const module_initialiser_1 = require("../../../utils/lib/module_initialiser");
const moduleName = default_1.default.identifier.ADMIN_OPS;
module.exports = {
    initModule: module_initialiser_1.initModule(moduleName, default_1.default, routes_1.default),
};
