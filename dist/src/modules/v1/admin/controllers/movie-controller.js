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
exports.addGenre = exports.getMovie = exports.deleteMovie = exports.updateMovie = exports.addMovie = void 0;
const MovieService_1 = require("../services/MovieService");
const helper_1 = require("../../../common/services/helper");
const httpContext = require("express-http-context");
function addMovie(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            httpContext.set('identifier', 'createMovie');
            const apiResponse = yield MovieService_1.default.addMovie(request === null || request === void 0 ? void 0 : request.body);
            return helper_1.formattedApiResponse(response, apiResponse);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
exports.addMovie = addMovie;
function updateMovie(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            httpContext.set('identifier', 'updateMovie');
            const apiResponse = yield MovieService_1.default.updateMovie(request);
            return helper_1.formattedApiResponse(response, apiResponse);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
exports.updateMovie = updateMovie;
function deleteMovie(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            httpContext.set('identifier', 'deleteMovie');
            const apiResponse = yield MovieService_1.default.deleteMovie(request === null || request === void 0 ? void 0 : request.query);
            return helper_1.formattedApiResponse(response, apiResponse);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
exports.deleteMovie = deleteMovie;
function getMovie(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            httpContext.set('identifier', 'getMovie');
            const apiResponse = yield MovieService_1.default.getMovie(request === null || request === void 0 ? void 0 : request.query);
            return helper_1.formattedApiResponse(response, apiResponse);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
exports.getMovie = getMovie;
function addGenre(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            httpContext.set('identifier', 'addGenre');
            const apiResponse = yield MovieService_1.default.addGenre(request === null || request === void 0 ? void 0 : request.body);
            return helper_1.formattedApiResponse(response, apiResponse);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
exports.addGenre = addGenre;
