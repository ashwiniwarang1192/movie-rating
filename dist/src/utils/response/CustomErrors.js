"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const require_1 = require("../require");
/**
 * Base class for all Error classes
 * Child classes have to follow this structure
 */
class CustomErrors extends Error {
    /**
     * @param errorType : Error category to be logged
     * @param httpCode : Status code for http header in response
     * @param statusCode : PRETR defined status codes
     * @param statusMessage :Message to be displayed to origin
     * @param info : Extra details that can be used
     */
    constructor(errorType, httpCode, statusCode, statusMessage, info) {
        super();
        this.response = {
            statusCode: Enums_1.StatusCode.ERROR_1001,
            statusType: Enums_1.ResponseStatus.ERROR,
            statusMessage: '',
            info: {},
        };
        this.errorType = Enums_1.ErrorTypes.APP_ERROR;
        this.httpCode = Enums_1.HttpStatus.ERROR_500;
        this.statusCode = Enums_1.StatusCode.SUCCESS_1001;
        this.statusType = Enums_1.ResponseStatus.ERROR;
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
    setResponse() {
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
            return this[`handle${this.name}`]();
        }
        return this.setResponse();
    }
    /**
     * This function will verify if errors are predefined and then proceed for response preperation
     * @param response Response object
     * @param err error object
     */
    static handleError(response, err) {
        require_1.logger.error(err);
        if (err.constructor.name === 'CustomErrors') {
            err.setResponse();
            return response.status(err.httpCode).send(err.getResponse());
        }
        return response.status(Enums_1.HttpStatus.ERROR_500).send(Enums_1.UNHANDLED_ERROR);
    }
    static handleErrorResponse(err) {
        require_1.logger.error({
            STEP: 'END',
            STATUS: Enums_1.ResponseStatus.ERROR,
            msg: err.message,
            code: err.stack,
        });
        if (err.constructor.name === 'CustomErrors') {
            return { statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage };
        }
        return Enums_1.UNHANDLED_ERROR;
    }
    static setResponseAndHandleError(response, err) {
        require_1.logger.error({
            STEP: 'END',
            STATUS: Enums_1.ResponseStatus.ERROR,
            msg: err.message,
            code: err.stack,
        });
        if (err.constructor.name === 'CustomErrors') {
            err.setResponse();
            return {
                httpCode: err.httpCode, statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage,
            };
        }
        return Object.assign({ httpCode: Enums_1.HttpStatus.ERROR_500 }, Enums_1.UNHANDLED_ERROR);
    }
    static returnStandardErrorResponse(err) {
        require_1.logger.error({
            STEP: 'END',
            STATUS: Enums_1.ResponseStatus.ERROR,
            msg: err.message,
            code: err.stack,
        });
        if (err.constructor.name === 'CustomErrors') {
            return {
                httpCode: err.httpCode, statusType: 'ERROR', statusCode: err.statusCode, statusMessage: err.statusMessage,
            };
        }
        return Object.assign({ httpCode: Enums_1.HttpStatus.ERROR_500 }, Enums_1.UNHANDLED_ERROR);
    }
    /**
     * This will return fina output to be displayed to origin
     */
    getResponse() {
        return this.response;
    }
    /**
     * Below functions will handle different type of errors listed in Enum ErrorType
     * For each new error added,if handling differs, create new function here
     * Function name sould be in format as "handle{ErrorType}"
     */
    handleAppError() {
        this.setResponse();
        return this.response;
    }
    handleAuthError() {
        this.setResponse();
        return this.response;
    }
    handleDdError() {
        return this.response;
    }
}
exports.default = CustomErrors;
