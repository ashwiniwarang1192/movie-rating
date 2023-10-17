/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as config from 'config';
import * as http from 'http';
import App from './app';
import { logger } from './utils/require';
import './utils/connections/mongo_connection';


// setting default timezone to UTC
process.env.TZ = config.get('app.TZ') || 'utc';

// normalizePort function body
function normalizePort(val: number | string): number | never {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (port >= 0 && port < 65536) {
    return port;
  }
  throw new Error(`Inavlid Port: ${val}`);
}

const port: number = normalizePort(process.env.PORT || config.get('app.PORT') || 5000);

// App.locals.newrelic = newrelic;

// Server Creation
// type addressType = AddressInfo | string;
const server = http.createServer(App);

// SERVER FUNCTIONS
function onListening(): void {
  const addr: any = server.address();
  const bind: string = typeof addr === 'string' ? `${addr}` : `http://${addr.address}:${addr.port}`;
  logger.info(`Listening on ${bind}`);
}

function onError(error: NodeJS.ErrnoException): never {
  if (error.syscall !== 'listen') throw error;
  const bind = typeof port === 'string' ? `Pipe ${String(port)}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES': {
      logger.info(`${bind} requires elevated privileges`);
      process.exit(1);
    }
    case 'EADDRINUSE': {
      logger.info(`${bind} is already in use`);
      process.exit(1);
    }
    default:
      throw error;
  }
}
// SERVER FUNCTIONS

App.get('/heartbeat', (req, res) => {
  res.send({
    statusCode: 1003,
    statusMessage: 'System is up and running',
    statusType: 'SUCCESS',
  });
});

// SERVER LISTENERS
if(process.env.NODE_ENV === 'staging') {
  server.listen(port);
} else {
  server.listen({ port, host: process.env.HOST || config.get('app.HOST') || '127.0.0.1' });
}

server.on('error', onError);
server.on('listening', onListening);
