import * as httpContext from 'express-http-context';
import WordleResponse from '../../response/WordleResponse';
import { ResponseObjectType } from '../../response/ResponseType';
import BaseError from './BaseError';
import wordleErrorMsg from '../../response/WordleErrorMsg';

// eslint-disable-next-line import/prefer-default-export
export default class DBError extends BaseError {
  private errorResponse: ResponseObjectType;

  private errorType: string;

  private identifier: string;

  constructor(message = '') {
    super(500, 'DB_ERROR');
    this.errorType = (wordleErrorMsg[message] ? wordleErrorMsg[message] : wordleErrorMsg.DB_ERROR) as string;
    this.errorResponse = WordleResponse.send(500, { message: this.errorType, statusMessage: this.errorType });
    this.identifier = httpContext.get('identifier') as string;
  }

  getErrorResponse() {
    return this.errorResponse;
  }

  getStatsPath() {
    return `${this.statusCode}.${this.errorName}.${this.errorType}.${this.identifier}`;
  }

  getLogData() {
    return {
      errorName: this.errorName,
      statusCode: this.statusCode,
      identifier: this.identifier,
      response: this.errorResponse,
    };
  }
}
