"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordleResponse = exports.WordleErrorMsg = exports.Success = exports.CustomError = exports.StatusCode = exports.HttpStatus = exports.ResponseStatus = exports.ErrorTypes = void 0;
/* eslint-disable import/no-cycle */
/**
 * This is a wrapper to CustomError class & different enum constants that can be used with response
 */
const Enums_1 = require("./Enums");
Object.defineProperty(exports, "ErrorTypes", { enumerable: true, get: function () { return Enums_1.ErrorTypes; } });
Object.defineProperty(exports, "ResponseStatus", { enumerable: true, get: function () { return Enums_1.ResponseStatus; } });
Object.defineProperty(exports, "HttpStatus", { enumerable: true, get: function () { return Enums_1.HttpStatus; } });
Object.defineProperty(exports, "StatusCode", { enumerable: true, get: function () { return Enums_1.StatusCode; } });
const CustomErrors_1 = require("./CustomErrors");
exports.CustomError = CustomErrors_1.default;
const Success_1 = require("./Success");
exports.Success = Success_1.default;
const WordleErrorMsg_1 = require("./WordleErrorMsg");
exports.WordleErrorMsg = WordleErrorMsg_1.default;
const WordleResponse_1 = require("./WordleResponse");
exports.WordleResponse = WordleResponse_1.default;
