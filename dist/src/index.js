"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const config = require("config");
const http = require("http");
const app_1 = require("./app");
const require_1 = require("./utils/require");
require("./utils/connections/mongo_connection");
// setting default timezone to UTC
process.env.TZ = config.get('app.TZ') || 'utc';
// normalizePort function body
function normalizePort(val) {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (port >= 0 && port < 65536) {
        return port;
    }
    throw new Error(`Inavlid Port: ${val}`);
}
const port = normalizePort(process.env.PORT || config.get('app.PORT') || 5000);
// App.locals.newrelic = newrelic;
// Server Creation
// type addressType = AddressInfo | string;
const server = http.createServer(app_1.default);
// SERVER FUNCTIONS
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `${addr}` : `http://${addr.address}:${addr.port}`;
    require_1.logger.info(`Listening on ${bind}`);
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    const bind = typeof port === 'string' ? `Pipe ${String(port)}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES': {
            require_1.logger.info(`${bind} requires elevated privileges`);
            process.exit(1);
        }
        case 'EADDRINUSE': {
            require_1.logger.info(`${bind} is already in use`);
            process.exit(1);
        }
        default:
            throw error;
    }
}
// SERVER FUNCTIONS
app_1.default.get('/heartbeat', (req, res) => {
    res.send({
        statusCode: 1003,
        statusMessage: 'System is up and running',
        statusType: 'SUCCESS',
    });
});
// SERVER LISTENERS
if (process.env.NODE_ENV === 'staging') {
    server.listen(process.env.PORT || config.get('app.PORT') || 5000);
}
else {
    server.listen({ port, host: process.env.HOST || config.get('app.HOST') || '127.0.0.1' });
}
server.on('error', onError);
server.on('listening', onListening);
