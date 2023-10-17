import * as winston from 'winston';
import * as httpContext from 'express-http-context';
import * as config from 'config';

const wistonInfo: any = config.get('winston');
const silent = process.env.NODE_ENV === 'test';

class Winston {
  private properties = () => {
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

  private winstonLogger = this.properties();

  private logger = {
    log: (message: string | object, level = 'info') => {
      this.winstonLogger.log(level, this.formatMessage(message));
    },
    error: (message: string | object) => {
      this.winstonLogger.log('info', this.formatMessage(message));
      this.winstonLogger.error(this.formatMessage(message));
    },
    warn: (message: string | object) => {
      this.winstonLogger.warn(this.formatMessage(message));
    },
    verbose: (message: string | object) => {
      this.winstonLogger.verbose(this.formatMessage(message));
    },
    info: (message: string | object) => {
      this.winstonLogger.info(this.formatMessage(message));
    },
    debug: (message: string | object) => {
      this.winstonLogger.debug(this.formatMessage(message));
    },
    silly: (message: string | object) => {
      this.winstonLogger.silly(this.formatMessage(message));
    },
  };


  private getDate() {
    const currentTime = new Date();
    const currentOffset = currentTime.getTimezoneOffset();
    const ISTOffset = 330; // IST offset UTC +5:30
    return new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
  }

  // Wrap Winston logger to print reqId in each log
  private formatMessage = (message) => {
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

  public Logger = () => this.logger;
}

const Logger = new Winston().Logger();
export default Logger;
