"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_1 = require("../../require");
class InitModules {
    constructor() {
        this.initVersion = (allmodules) => (version) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const modules = allmodules.map((module) => this.initModule(version, module));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return [].concat(...modules);
        };
        this.initModule = (version, module) => {
            require_1.logger.info(`Initialising module ${module}`);
            // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
            const initSubModule = require(`./../../../modules/${version}/${module}/`);
            return Object.assign(Object.assign({}, initSubModule), { preRoute: `/${version}/${module}` });
        };
    }
}
exports.default = new InitModules();
