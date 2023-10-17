/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextFunction, Response } from 'express';
import {
  ErrorTypes, ResponseStatus, HttpStatus, StatusCode, ResponseFormat, UNHANDLED_ERROR,
} from './Enums';
import { logger } from '../require';

/**
 * Base class for all Error classes
 * Child classes have to follow this structure
 */
export default class CustomErrors extends Error implements ResponseFormat {
  response: ResponseFormat = {
    statusCode: StatusCode.ERROR_1001,
    statusType: ResponseStatus.ERROR,
    statusMessage: '',
    info: {},
  };

  errorType: ErrorTypes = ErrorTypes.APP_ERROR;

  statusMessage: string;

  httpCode: HttpStatus = HttpStatus.ERROR_500;

  statusCode: StatusCode = StatusCode.SUCCESS_1001;

  statusType: ResponseStatus = ResponseStatus.ERROR;

  info?: object;

  /**
   * @param errorType : Error category to be logged
   * @param httpCode : Status code for http header in response
   * @param statusCode : PRETR defined status codes
   * @param statusMessage :Message to be displayed to origin
   * @param info : Extra details that can be used
   */
  constructor(
    errorType: ErrorTypes,
    httpCode: HttpStatus,
    statusCode: StatusCode,
    statusMessage: string,
    info?: object,
  ) {
    super();
    this.name = errorType;
    this.httpCode = httpCode;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.info = info;
    this.init();
  }

  /**
   * This function provide default response pattern
   */
  setResponse(): void {
    this.response = {
      statusCode: this.statusCode,
      statusType: this.statusType,
      statusMessage: this.statusMessage,
      // info: this.info,
    };
  }

  /**
   * This function must be overridden by child classes to format their response
   */
  init() {
    Error.captureStackTrace(this, CustomErrors);
    // check if method handling code is provided
    if (typeof this[`handle${this.name}`] === 'function') {
      return (this[`handle${this.name}`] as NextFunction)();
    }
    return this.setResponse();
  }

  /**
   * This function will verify if errors are predefined and then proceed for response preperation
   * @param response Response object
   * @param err error object
   */
  static handleError(response: Response, err: CustomErrors) {
    logger.error(err);
    if (err.constructor.name === 'CustomErrors') {
      err.setResponse();
      return response.status(err.httpCode).send(err.getResponse());
    }
    return response.status(HttpStatus.ERROR_500).send(UNHANDLED_ERROR);
  }

  static handleErrorResponse(err: CustomErrors) {
    logger.error({
      STEP: 'END',
      STATUS: ResponseStatus.ERROR,
      msg: err.message,
      code: err.stack,
    });
    if (err.constructor.name === 'CustomErrors') {
      return { statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage };
    }
    return UNHANDLED_ERROR;
  }

  static setResponseAndHandleError(response: Response, err: CustomErrors) {
    logger.error({
      STEP: 'END',
      STATUS: ResponseStatus.ERROR,
      msg: err.message,
      code: err.stack,
    });
    if (err.constructor.name === 'CustomErrors') {
      err.setResponse();
      return {
        httpCode: err.httpCode, statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage,
      };
    }
    return { httpCode: HttpStatus.ERROR_500, ...UNHANDLED_ERROR };
  }

  static returnStandardErrorResponse(err: CustomErrors) {
    logger.error({
      STEP: 'END',
      STATUS: ResponseStatus.ERROR,
      msg: err.message,
      code: err.stack,
    });
    if (err.constructor.name === 'CustomErrors') {
      return {
        httpCode: err.httpCode, statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage,
      };
    }
    return { httpCode: HttpStatus.ERROR_500, ...UNHANDLED_ERROR };
  }

  /**
   * This will return fina output to be displayed to origin
   */
  getResponse(): object {
    return this.response;
  }

  /**
   * Below functions will handle different type of errors listed in Enum ErrorType
   * For each new error added,if handling differs, create new function here
   * Function name sould be in format as "handle{ErrorType}"
   */

  handleAppError(): object {
    this.setResponse();
    return this.response;
  }

  handleAuthError(): object {
    this.setResponse();
    return this.response;
  }

  handleDdError(): object {
    return this.response;
  }
}
