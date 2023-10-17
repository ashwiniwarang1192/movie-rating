"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(statusCode, errorName) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.errorName = errorName;
        Error.captureStackTrace(this);
    }
}
exports.default = BaseError;
