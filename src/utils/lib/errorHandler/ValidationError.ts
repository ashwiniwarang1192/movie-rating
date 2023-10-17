import * as httpContext from 'express-http-context';
import WordleResponse from '../../response/WordleResponse';
import { ResponseObjectType } from '../../response/ResponseType';
import wordleErrorMsg from '../../response/WordleErrorMsg';
import BaseError from './BaseError';
import { StatusCode } from '../../response';

// eslint-disable-next-line import/prefer-default-export
export default class ValidationError extends BaseError {
  private errorResponse: ResponseObjectType;

  private errorType: string;

  private identifier: string;

  constructor(message: string | '' = '') {
    super(StatusCode.ERROR_2001, 'VALIDATION_ERROR');
    this.errorType = message || wordleErrorMsg.DEFAULT_ERROR;
    this.errorResponse = WordleResponse.send(StatusCode.ERROR_2001, { message: this.errorType, statusMessage: this.errorType });
    this.identifier = httpContext.get('identifier') as string;
    this.message = this.errorType;
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
