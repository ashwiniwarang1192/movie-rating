"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpContext = require("express-http-context");
const WordleResponse_1 = require("../../response/WordleResponse");
const WordleErrorMsg_1 = require("../../response/WordleErrorMsg");
const BaseError_1 = require("./BaseError");
const response_1 = require("../../response");
// eslint-disable-next-line import/prefer-default-export
class ValidationError extends BaseError_1.default {
    constructor(message = '') {
        super(response_1.StatusCode.ERROR_2001, 'VALIDATION_ERROR');
        this.errorType = message || WordleErrorMsg_1.default.DEFAULT_ERROR;
        this.errorResponse = WordleResponse_1.default.send(response_1.StatusCode.ERROR_2001, { message: this.errorType, statusMessage: this.errorType });
        this.identifier = httpContext.get('identifier');
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
exports.default = ValidationError;
