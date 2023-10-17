/* eslint-disable import/no-import-module-exports */
import moduleConfig from './config/default';
import route from './routes';
import { initModule } from '../../../utils/lib/module_initialiser';

const moduleName = moduleConfig.identifier.GET_LISTING;
module.exports = {
  initModule: initModule(moduleName, moduleConfig, route),
};
