"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_PAYLOAD = exports.UNHANDLED_ERROR = exports.ERRORMESSAGE = exports.StatusCode = exports.HttpStatus = exports.ResponseStatus = exports.ErrorTypes = void 0;
/**
 * Type of errors that can be thrown by application
 */
var ErrorTypes;
(function (ErrorTypes) {
    ErrorTypes["APP_ERROR"] = "AppError";
    ErrorTypes["AUTH_ERROR"] = "AuthError";
    ErrorTypes["DB_ERROR"] = "DdError";
    ErrorTypes["HTTP_ERROR"] = "HttpError";
    ErrorTypes["DATA_MISSING_ERROR"] = "DataMissingError";
    ErrorTypes["ROUTING_ERROR"] = "RoutingError";
    ErrorTypes["VALIDATION_ERROR"] = "ValidationError";
    ErrorTypes["TIMEOUT_ERROR"] = "TimeoutErr";
})(ErrorTypes = exports.ErrorTypes || (exports.ErrorTypes = {}));
/**
 * Status types for success and errors
 */
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["SUCCESS"] = "SUCCESS";
    ResponseStatus["ERROR"] = "ERROR";
    ResponseStatus["PARTIAL_SUCCESS"] = "SUCCESS";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
/**
 * HTTP status codes that can be sent back with response for header
 */
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["SUCCESS_DEFAULT"] = 200] = "SUCCESS_DEFAULT";
    HttpStatus[HttpStatus["SUCCESS_200"] = 200] = "SUCCESS_200";
    HttpStatus[HttpStatus["ERROR_DEFAULT"] = 500] = "ERROR_DEFAULT";
    HttpStatus[HttpStatus["ERROR_400"] = 400] = "ERROR_400";
    HttpStatus[HttpStatus["ERROR_401"] = 401] = "ERROR_401";
    HttpStatus[HttpStatus["ERROR_500"] = 500] = "ERROR_500";
    HttpStatus[HttpStatus["ERROR_TIMEOUT"] = 500] = "ERROR_TIMEOUT";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
/**
 * Application defined status codes to be listed here
 */
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS_1001"] = 1001] = "SUCCESS_1001";
    StatusCode[StatusCode["SUCCESS_201"] = 201] = "SUCCESS_201";
    StatusCode[StatusCode["SUCCESS_1003"] = 1003] = "SUCCESS_1003";
    StatusCode[StatusCode["SUCCESS_1004"] = 1004] = "SUCCESS_1004";
    StatusCode[StatusCode["SUCCESS_1005"] = 1005] = "SUCCESS_1005";
    StatusCode[StatusCode["SUCCESS_1006"] = 1006] = "SUCCESS_1006";
    StatusCode[StatusCode["SUCCESS_1008"] = 1008] = "SUCCESS_1008";
    StatusCode[StatusCode["ERROR_1001"] = 1001] = "ERROR_1001";
    StatusCode[StatusCode["ERROR_2001"] = 2001] = "ERROR_2001";
    StatusCode[StatusCode["ERROR_2002"] = 2002] = "ERROR_2002";
    StatusCode[StatusCode["ERROR_2003"] = 2003] = "ERROR_2003";
    StatusCode[StatusCode["ERROR_2004"] = 2004] = "ERROR_2004";
    StatusCode[StatusCode["ERROR_2005"] = 2005] = "ERROR_2005";
    StatusCode[StatusCode["ERROR_2006"] = 2006] = "ERROR_2006";
    StatusCode[StatusCode["ERROR_2008"] = 2008] = "ERROR_2008";
    StatusCode[StatusCode["ERROR_2020"] = 2020] = "ERROR_2020";
    StatusCode[StatusCode["ERROR_2050"] = 2050] = "ERROR_2050";
    StatusCode[StatusCode["ERROR_2051"] = 2051] = "ERROR_2051";
    StatusCode[StatusCode["ERROR_3001"] = 3001] = "ERROR_3001";
    StatusCode[StatusCode["ERROR_3002"] = 3002] = "ERROR_3002";
    StatusCode[StatusCode["ERROR_3003"] = 3003] = "ERROR_3003";
    StatusCode[StatusCode["ERROR_3004"] = 3004] = "ERROR_3004";
    StatusCode[StatusCode["ERROR_3005"] = 3005] = "ERROR_3005";
    StatusCode[StatusCode["ERROR_400"] = 400] = "ERROR_400";
    StatusCode[StatusCode["ERROR_401"] = 401] = "ERROR_401";
    StatusCode[StatusCode["ERROR_500"] = 500] = "ERROR_500";
    StatusCode[StatusCode["ERROR_TIMEOUT"] = 500] = "ERROR_TIMEOUT";
    StatusCode[StatusCode["ERROR_2223"] = 2223] = "ERROR_2223";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var ERRORMESSAGE;
(function (ERRORMESSAGE) {
    ERRORMESSAGE["TIMEOUT_ERROR"] = "Timeout exceeds";
    ERRORMESSAGE["UNHANDLED_ERROR"] = "Unhandled Error";
    ERRORMESSAGE["INVALID_PAYLOAD"] = "Invalid Payload!!";
})(ERRORMESSAGE = exports.ERRORMESSAGE || (exports.ERRORMESSAGE = {}));
exports.UNHANDLED_ERROR = {
    statusCode: StatusCode.ERROR_500,
    statusType: ResponseStatus.ERROR,
    statusMessage: ERRORMESSAGE.UNHANDLED_ERROR,
};
exports.INVALID_PAYLOAD = {
    statusCode: StatusCode.ERROR_400,
    statusType: ResponseStatus.ERROR,
    statusMessage: ERRORMESSAGE.INVALID_PAYLOAD,
};
