/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import { NextFunction } from 'express';
import { logger } from '../../require';

class InitModules {
  public initVersion = (allmodules): NextFunction => (version: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const modules = allmodules.map((module: string) => this.initModule(version, module));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return [].concat(...modules);
  };

  private initModule = (version: string, module: string): Record<string, unknown> => {
    logger.info(`Initialising module ${module}`);
    // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
    const initSubModule: NextFunction = require(`./../../../modules/${version}/${module}/`);
    return {
      ...initSubModule,
      preRoute: `/${version}/${module}`,
    };
  };
}

export default new InitModules();
