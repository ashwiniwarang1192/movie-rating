/**
 * Type of errors that can be thrown by application
 */
export enum ErrorTypes {
  APP_ERROR = 'AppError',
  AUTH_ERROR = 'AuthError',
  DB_ERROR = 'DdError',
  HTTP_ERROR = 'HttpError',
  DATA_MISSING_ERROR = 'DataMissingError',
  ROUTING_ERROR = 'RoutingError',
  VALIDATION_ERROR = 'ValidationError',
  TIMEOUT_ERROR = 'TimeoutErr',
}

/**
 * Status types for success and errors
 */
export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PARTIAL_SUCCESS = 'SUCCESS',
}

/**
 * HTTP status codes that can be sent back with response for header
 */
export enum HttpStatus {
  SUCCESS_DEFAULT = 200,
  SUCCESS_200 = 200,
  ERROR_DEFAULT = 500,
  ERROR_400 = 400,
  ERROR_401 = 401,
  ERROR_500 = 500,
  ERROR_TIMEOUT = 500,
}

/**
 * Application defined status codes to be listed here
 */
export enum StatusCode {
  SUCCESS_1001 = 1001,
  SUCCESS_201 = 201,
  SUCCESS_1003 = 1003,
  SUCCESS_1004 = 1004,
  SUCCESS_1005 = 1005,
  SUCCESS_1006 = 1006,
  SUCCESS_1008 = 1008,

  ERROR_1001 = 1001,
  ERROR_2001 = 2001,
  ERROR_2002 = 2002,
  ERROR_2003 = 2003,
  ERROR_2004 = 2004,
  ERROR_2005 = 2005,
  ERROR_2006 = 2006,
  ERROR_2008 = 2008,
  ERROR_2020 = 2020,
  ERROR_2050 = 2050,
  ERROR_2051 = 2051,
  ERROR_3001 = 3001,
  ERROR_3002 = 3002,
  ERROR_3003 = 3003,
  ERROR_3004 = 3004,
  ERROR_3005 = 3005,
  ERROR_400 = 400,
  ERROR_401 = 401,
  ERROR_500 = 500,
  ERROR_TIMEOUT = 500,
  ERROR_2223 = 2223,
}

export enum ERRORMESSAGE {
  TIMEOUT_ERROR = 'Timeout exceeds',
  UNHANDLED_ERROR = 'Unhandled Error',
  INVALID_PAYLOAD = 'Invalid Payload!!',

}

export const UNHANDLED_ERROR = {
  statusCode: StatusCode.ERROR_500,
  statusType: ResponseStatus.ERROR,
  statusMessage: ERRORMESSAGE.UNHANDLED_ERROR,
};

export const INVALID_PAYLOAD = {
  statusCode: StatusCode.ERROR_400,
  statusType: ResponseStatus.ERROR,
  statusMessage: ERRORMESSAGE.INVALID_PAYLOAD,
};

/**
 * This is format of response that need to be returned to user
 */
export interface ResponseFormat {
  statusCode: StatusCode
  statusType: ResponseStatus
  statusMessage: string,
  info?: object
}
