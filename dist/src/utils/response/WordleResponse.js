"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpContext = require("express-http-context");
const merge = require("lodash/merge");
const wordleResponses = require("./WordleResponses.json");
class WordleResponse {
    static send(code, data = {}) {
        if (!httpContext.get('identifier')) {
            return {
                httpCode: 500,
                response: {
                    statusCode: 500,
                    statusMessage: 'Error while creating post',
                    statusType: 'ERROR',
                    message: 'Error while creating post',
                    status: 'error',
                },
            };
        }
        const response = JSON.parse(JSON.stringify(WordleResponse.getData()[code]));
        merge(response === null || response === void 0 ? void 0 : response.response, data);
        return response;
    }
    static getData() {
        return wordleResponses[httpContext.get('identifier')];
    }
}
exports.default = WordleResponse;
