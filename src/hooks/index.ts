/* eslint-disable import/no-import-module-exports */
import { cors } from './cors';

const hooks = {
  auth: [cors],
  cors: [cors],
};
export {
  hooks
};
