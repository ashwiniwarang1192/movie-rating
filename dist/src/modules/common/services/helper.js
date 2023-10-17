"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnParamMapping = exports.successResponse = exports.santizeBody = exports.formattedApiResponses = exports.formattedApiResponse = void 0;
const require_1 = require("../../../utils/require");
const xss = require('xss');
function formattedApiResponse(responseObj, apiResponse) {
    const { httpCode, response } = apiResponse;
    return responseObj.status(httpCode).json(response);
}
exports.formattedApiResponse = formattedApiResponse;
function formattedApiResponses(responseObj, apiResponse) {
    const { httpCode } = apiResponse, response = __rest(apiResponse, ["httpCode"]);
    return responseObj.status(httpCode).json(response);
}
exports.formattedApiResponses = formattedApiResponses;
function successResponse(responseData) {
    return Object.assign({ httpCode: require_1.HttpStatus.SUCCESS_200 }, new require_1.Success(require_1.StatusCode.SUCCESS_1001, require_1.ResponseStatus.SUCCESS, Object.assign({ statusType: require_1.ResponseStatus.SUCCESS }, responseData)));
}
exports.successResponse = successResponse;
function santizeBody(reqBody) {
    return (typeof reqBody === 'string') ? xss(reqBody) : reqBody;
}
exports.santizeBody = santizeBody;
const columnParamMapping = {
    name: {
        type: 'string',
        columnName: 'name',
    },
    director: {
        type: 'string',
        columnName: 'director',
    },
    '99popularity': {
        type: 'number',
        columnName: '99popularity'
    }
};
exports.columnParamMapping = columnParamMapping;
