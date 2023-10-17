"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * Constains initialization steps for a every module.
 * Code taken out as repetative seen
 * Use of curry function
 * Use like
 * //module.exports = {
 * //initModule: initModule(moduleName, moduleConfig, routes, 'all_discount_action', printEventLog),
 * //};
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModule = void 0;
const config = require("config");
const express_1 = require("express");
const winston_1 = require("../logger/winston");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initMiddleware(app) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (req, res, next) => {
        winston_1.default.log('This is test Users');
        next();
    };
}
function initConfiguration(app, moduleName, moduleConfig) {
    config.util.setModuleDefaults(`${moduleName}-config`, moduleConfig);
}
function initModule(moduleName, moduleConfig, routes) {
    // bind routes
    return (app, preRoute) => {
        const router = express_1.Router();
        routes.map((route) => {
            const { hook } = route;
            if (hook) {
                router[route.method](`${preRoute}${route.path}`, hook, route.action);
            }
            else {
                router[route.method](`${preRoute}${route.path}`, route.action);
            }
            return route;
        });
        app.use(router);
        // load custom configuration for this module
        initConfiguration(app, moduleName, moduleConfig);
        // register middleware if any
        initMiddleware(app);
        // eslint-disable-next-line no-param-reassign
        app.locals[moduleName] = {
            // register all models in app.local
            models: {},
            // register all helpers in app.local.
            // @TODO::
            helpers: {},
            // register all services in app.local.
            // @TODO::
            services: {},
        };
    };
}
exports.initModule = initModule;
