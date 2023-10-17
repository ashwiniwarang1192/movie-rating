/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-import-assign */
import * as mongoose from 'mongoose';
import * as config from 'config';
import { logger } from '../require';

class MongoConnection {
  constructor() {
    const url = this.getMongoURL();
    logger.info(`Establish new connection with url ${url}`);
    mongoose.set('toJSON', { virtuals: true });
    // eslint-disable-next-line max-len

    mongoose.set('debug', (collectionName, methodName, query, doc, ...extra) => logger.log({
      Collection: collectionName, Method: methodName, MONGO_QUERY_DETAILS: `db.${collectionName}.${methodName}(${JSON.stringify(query)},${JSON.stringify(doc)}`, Query: JSON.stringify(query), result: doc, extra,
    }));

    mongoose.connect(this.getMongoURL())
      .then(() => { logger.log('mongo connected'); })
      .catch((err) => { logger.error(err); });
  }

  // eslint-disable-next-line class-methods-use-this
  getMongoURL() {
    const mongoConfig: any = config.get('mongo');
    if (!mongoConfig.env || !(mongoConfig.env.toLowerCase() === 'staging')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return process.env.MONGODB_URI || mongoConfig.uri;
    }
  }
}

export default new MongoConnection();
