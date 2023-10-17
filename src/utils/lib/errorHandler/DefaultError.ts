import * as httpContext from 'express-http-context';
import WordleResponse from '../../response/WordleResponse';
import { ResponseObjectType } from '../../response/ResponseType';
import BaseError from './BaseError';

// eslint-disable-next-line import/prefer-default-export
export default class DefaultError extends BaseError {
  private errorResponse: ResponseObjectType;

  private errorType: string;

  private identifier: string;

  constructor() {
    super(500, 'DEFAULT_ERROR');
    this.errorResponse = WordleResponse.send(500);
    this.errorType = this.errorResponse.response.statusMessage;
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
