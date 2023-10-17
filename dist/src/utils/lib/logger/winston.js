"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const httpContext = require("express-http-context");
const config = require("config");
const wistonInfo = config.get('winston');
const silent = process.env.NODE_ENV === 'test';
class Winston {
    constructor() {
        this.properties = () => {
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
                return winston.createLogger({
                    format: winston.format.json(),
                    transports: [new winston.transports.Console(wistonInfo.console)],
                    exitOnError: false,
                });
            }
            return winston.createLogger({
                format: winston.format.json(),
                transports: [
                    new winston.transports.Console(wistonInfo.console),
                    new winston.transports.File(wistonInfo.master),
                    new winston.transports.File(wistonInfo.error)
                ],
                exitOnError: false,
            });
        };
        this.winstonLogger = this.properties();
        this.logger = {
            log: (message, level = 'info') => {
                this.winstonLogger.log(level, this.formatMessage(message));
            },
            error: (message) => {
                this.winstonLogger.log('info', this.formatMessage(message));
                this.winstonLogger.error(this.formatMessage(message));
            },
            warn: (message) => {
                this.winstonLogger.warn(this.formatMessage(message));
            },
            verbose: (message) => {
                this.winstonLogger.verbose(this.formatMessage(message));
            },
            info: (message) => {
                this.winstonLogger.info(this.formatMessage(message));
            },
            debug: (message) => {
                this.winstonLogger.debug(this.formatMessage(message));
            },
            silly: (message) => {
                this.winstonLogger.silly(this.formatMessage(message));
            },
        };
        // Wrap Winston logger to print reqId in each log
        this.formatMessage = (message) => {
            const msg = {
                date: this.getDate(),
                data: message
            };
            const reqId = httpContext.get('reqId');
            const reqDetails = httpContext.get('reqDetails');
            httpContext.set('reqDetails', null);
            if (reqId) {
                msg['reqID'] = reqId;
            }
            if (reqDetails) {
                msg['reqDetails'] = reqDetails;
            }
            return JSON.stringify(msg);
        };
        this.Logger = () => this.logger;
    }
    getDate() {
        const currentTime = new Date();
        const currentOffset = currentTime.getTimezoneOffset();
        const ISTOffset = 330; // IST offset UTC +5:30
        return new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    }
}
const Logger = new Winston().Logger();
exports.default = Logger;
