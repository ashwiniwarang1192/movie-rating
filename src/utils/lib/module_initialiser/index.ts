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

import * as config from 'config';
import { Application, Router } from 'express';
import logger from '../logger/winston';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initMiddleware(app: Application) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (req, res, next) => {
    logger.log('This is test Users'); next();
  };
}

function initConfiguration(app: Application, moduleName: string, moduleConfig: object) {
  config.util.setModuleDefaults(`${moduleName}-config`, moduleConfig);
}

function initModule(
  moduleName: string,
  moduleConfig: object,
  routes: any,
) {
  // bind routes
  return (app: Application, preRoute: string) => {
    const router = Router();
    routes.map((route: any) => {
      const { hook } = route;
      if (hook) {
        router[route.method](`${preRoute}${route.path}`, hook, route.action);
      } else {
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

// eslint-disable-next-line import/prefer-default-export
export { initModule };
