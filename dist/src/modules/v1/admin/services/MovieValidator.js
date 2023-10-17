"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const errorHandler_1 = require("../../../../utils/lib/errorHandler");
const WordleErrorMsg_1 = require("../../../../utils/response/WordleErrorMsg");
class PostRequestValidator {
    static isRequestValid(requestBody) {
        return (!!requestBody['99popularity'] && !!requestBody['imdb_score'] && !!requestBody['genre'] && !!requestBody['director'] && !!requestBody['created_by']);
    }
    static validateMovieId(movieId) {
        if (movieId && !mongoose.Types.ObjectId.isValid(movieId))
            throw new errorHandler_1.ValidationError(WordleErrorMsg_1.default.INVALID_POST_ID);
    }
}
exports.default = PostRequestValidator;
