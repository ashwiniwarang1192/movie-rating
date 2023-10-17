"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpContext = require("express-http-context");
const WordleResponse_1 = require("../../response/WordleResponse");
const BaseError_1 = require("./BaseError");
// eslint-disable-next-line import/prefer-default-export
class DefaultError extends BaseError_1.default {
    constructor() {
        super(500, 'DEFAULT_ERROR');
        this.errorResponse = WordleResponse_1.default.send(500);
        this.errorType = this.errorResponse.response.statusMessage;
        this.identifier = httpContext.get('identifier');
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
exports.default = DefaultError;
