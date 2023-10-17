import * as config from 'config';
import * as httpContext from 'express-http-context';

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const morganInfo: any = config.get('morgan');

if (process.env.NODE_ENV !== 'development') {
  morgan.accessLogStream = fs.createWriteStream(path.join(morganInfo.dirname, 'access.log'), { flags: 'a' });
  morgan.logger = (msg) => msg;
}

morgan.token('url', (req) => req.url);

morgan.token('param', (req) => JSON.stringify(req.params));

morgan.token('body', (req) => JSON.stringify(req.body));

morgan.token('header', (req) => JSON.stringify(req.headers));

morgan.token('host', (req) => req.hostname);

morgan.token('dateIST', () => {
  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330; // IST offset UTC +5:30
  return new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
});

morgan.token('reqId', () => httpContext.get('reqId'));

morgan.loggerFormat = `[:dateIST] :reqId ':method :url' ':host' :status :res[content-length] - :response-time ms`;

export default morgan;
