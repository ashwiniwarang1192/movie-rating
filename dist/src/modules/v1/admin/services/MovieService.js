"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
const require_1 = require("../../../../utils/require");
const mongo_1 = require("../../../common/models/mongo");
const helper_1 = require("../../../common/services/helper");
const MovieValidator_1 = require("./MovieValidator");
const MovieHelper_1 = require("./MovieHelper");
const response_1 = require("../../../../utils/response");
const errorHandler_1 = require("../../../../utils/lib/errorHandler");
const lodash_1 = require("lodash");
const ObjectId = require('mongoose').Types.ObjectId;
class MovieService {
    /**
     * Will insert movies in db
     */
    static addMovie(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key in requestBody) {
                requestBody[key] = (typeof requestBody[key] === 'string') ? helper_1.santizeBody(requestBody[key]) : requestBody[key];
            }
            //if(!await MovieValidator.isRequestValid(requestBody)) throw new ValidationError(WordleErrorMsg.INVALID_INPUT); 
            let insertedMovie = yield mongo_1.Movies.create(requestBody);
            const insertedMovieId = insertedMovie === null || insertedMovie === void 0 ? void 0 : insertedMovie._id;
            return response_1.WordleResponse.send(require_1.StatusCode.SUCCESS_1001, { createdOn: insertedMovie.createdAt, id: insertedMovieId });
        });
    }
    /**
     * Will update the movies in db
     */
    static updateMovie(request) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key in request.body) {
                request.body[key] = (typeof request.body[key] === 'string') ? helper_1.santizeBody(request.body[key]) : request.body[key];
            }
            const { movieId } = request === null || request === void 0 ? void 0 : request.params;
            if (!movieId)
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.EMPTY_POST_ID);
            MovieValidator_1.default.validateMovieId(movieId);
            const existingMovie = yield mongo_1.Movies.findOne({ _id: movieId });
            if (!existingMovie)
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.INVALID_POST_ID);
            const updatedMovie = yield mongo_1.Movies.update({ _id: movieId }, { $set: request.body });
            if (!updatedMovie)
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.INVALID_POST_ID);
            return response_1.WordleResponse.send(require_1.StatusCode.SUCCESS_1001, { updatedOn: updatedMovie === null || updatedMovie === void 0 ? void 0 : updatedMovie.updatedAt, id: updatedMovie === null || updatedMovie === void 0 ? void 0 : updatedMovie._id });
        });
    }
    /**
     * Will delete the movies from db
     */
    static deleteMovie(requestQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.isEmpty(requestQuery) || !(requestQuery === null || requestQuery === void 0 ? void 0 : requestQuery.movieId))
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.NOT_ENOUGH_DATA);
            const query = { _id: ObjectId(requestQuery === null || requestQuery === void 0 ? void 0 : requestQuery.movieId) };
            let deleteMovie = yield mongo_1.Movies.deleteOne(query);
            if (!deleteMovie || deleteMovie.deletedCount === 0)
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.INVALID_POST_ID);
            return response_1.WordleResponse.send(require_1.StatusCode.SUCCESS_1001);
        });
    }
    /**
     * Will read the movies from db
     */
    static getMovie(requestQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lodash_1.isEmpty(requestQuery))
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.NOT_ENOUGH_DATA);
            const query = MovieHelper_1.default.formatQueryParams(requestQuery);
            MovieValidator_1.default.validateMovieId(requestQuery.movieId);
            let retrievedMovie = yield mongo_1.Movies.findOne(query);
            if (!retrievedMovie)
                throw new errorHandler_1.ValidationError(response_1.WordleErrorMsg.EMPTY_RESULTS);
            return response_1.WordleResponse.send(require_1.StatusCode.SUCCESS_1001, { data: MovieHelper_1.default.getResponseObject(retrievedMovie) });
        });
    }
    static addGenre(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key in requestBody) {
                requestBody[key] = (typeof requestBody[key] === 'string') ? helper_1.santizeBody(requestBody[key]) : requestBody[key];
            }
            //if(!await MovieValidator.isRequestValid(requestBody)) throw new ValidationError(WordleErrorMsg.INVALID_INPUT); 
            let insertedGenre = yield mongo_1.Genre.create(requestBody);
            const insertedMovieId = insertedGenre === null || insertedGenre === void 0 ? void 0 : insertedGenre._id;
            return response_1.WordleResponse.send(require_1.StatusCode.SUCCESS_1001, { createdOn: insertedGenre.createdAt, id: insertedMovieId });
        });
    }
}
exports.default = MovieService;
