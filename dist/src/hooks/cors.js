"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
// eslint-disable-next-line import/prefer-default-export,func-names
const cors = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // intercept OPTIONS method
    if (request.method === 'OPTIONS') {
        response.sendStatus(200);
    }
    else {
        next();
    }
};
exports.cors = cors;
