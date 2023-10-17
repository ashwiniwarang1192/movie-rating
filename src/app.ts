/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as httpContext from 'express-http-context';
import * as helmet from 'helmet';
import { Response, Request, NextFunction } from 'express';
import Morgan from './utils/lib/logger/morgan';
import logger from './utils/lib/logger/winston';

import appVersions from './modules/versions';
import { HttpStatus, INVALID_PAYLOAD } from './utils/response/Enums';
import { handleAndLogError } from './hooks/errorHandler';
import { BaseError, DefaultError } from './utils/lib/errorHandler';

// Creates and configures an ExpressJS web server.

class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.initModules();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.express.use((error, request: Request, res: Response, next: NextFunction) => (error instanceof BaseError ? handleAndLogError(error, res) : handleAndLogError(new DefaultError(), res)));
  }

// eslint-disable-next-line class-methods-use-this

  // Configure Express middleware.
  private middleware(): void {
    // debug('app launched in ', this.express.get('env'), ' mode');
    this.express.use(bodyParser.json());
    // eslint-disable-next-line consistent-return
    this.express.use((error, req: express.Request, res: express.Response, next) => {
      if (error instanceof SyntaxError && req.method !== 'GET') {
        return res.status(HttpStatus.ERROR_400).send(INVALID_PAYLOAD);
      }
      next();
    });
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(httpContext.middleware);
    this.express.use(helmet());
    this.express.use(
      Morgan(Morgan.loggerFormat, { stream: Morgan.accessLogStream }),
    );
  }

  private initModules(): void {
    appVersions.map((version) => {
      logger.log(version);
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
        const mod = require(`./modules/${version}/`);
        const subModules = mod.initModules(version);
        subModules.forEach((subModule) => {
          subModule.initModule(this.express, subModule.preRoute);
        });
        logger.info(`Initialised version ${version}`);
      } catch (error) {
        logger.error(error);
      }
      return version;
    });
  }
}
export default new App().express;