"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const bodyParser = require("body-parser");
const express = require("express");
const httpContext = require("express-http-context");
const helmet = require("helmet");
const winston_1 = require("./utils/lib/logger/winston");
const versions_1 = require("./modules/versions");
const Enums_1 = require("./utils/response/Enums");
const errorHandler_1 = require("./hooks/errorHandler");
const errorHandler_2 = require("./utils/lib/errorHandler");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.initModules();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.express.use((error, request, res, next) => (error instanceof errorHandler_2.BaseError ? errorHandler_1.handleAndLogError(error, res) : errorHandler_1.handleAndLogError(new errorHandler_2.DefaultError(), res)));
    }
    // eslint-disable-next-line class-methods-use-this
    // Configure Express middleware.
    middleware() {
        // debug('app launched in ', this.express.get('env'), ' mode');
        this.express.use(bodyParser.json());
        // eslint-disable-next-line consistent-return
        this.express.use((error, req, res, next) => {
            if (error instanceof SyntaxError && req.method !== 'GET') {
                return res.status(Enums_1.HttpStatus.ERROR_400).send(Enums_1.INVALID_PAYLOAD);
            }
            next();
        });
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(httpContext.middleware);
        this.express.use(helmet());
    }
    initModules() {
        versions_1.default.map((version) => {
            winston_1.default.log(version);
            try {
                // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
                const mod = require(`./modules/${version}/`);
                const subModules = mod.initModules(version);
                subModules.forEach((subModule) => {
                    subModule.initModule(this.express, subModule.preRoute);
                });
                winston_1.default.info(`Initialised version ${version}`);
            }
            catch (error) {
                winston_1.default.error(error);
            }
            return version;
        });
    }
}
exports.default = new App().express;
