"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpContext = require("express-http-context");
const WordleResponse_1 = require("../../response/WordleResponse");
const BaseError_1 = require("./BaseError");
const WordleErrorMsg_1 = require("../../response/WordleErrorMsg");
// eslint-disable-next-line import/prefer-default-export
class DBError extends BaseError_1.default {
    constructor(message = '') {
        super(500, 'DB_ERROR');
        this.errorType = (WordleErrorMsg_1.default[message] ? WordleErrorMsg_1.default[message] : WordleErrorMsg_1.default.DB_ERROR);
        this.errorResponse = WordleResponse_1.default.send(500, { message: this.errorType, statusMessage: this.errorType });
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
exports.default = DBError;
