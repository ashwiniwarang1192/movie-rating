"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MovieHelper {
    static formatQueryParams(queryParams) {
        if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.movieId) {
            return { _id: queryParams.movieId };
        }
        return {};
    }
    static getResponseObject(retrievedMovie) {
        return {
            _id: retrievedMovie._id,
            '99popularity': retrievedMovie['99popularity'],
            director: retrievedMovie.director,
            imdb_score: retrievedMovie.imdb_score,
            genre: retrievedMovie.genre,
            name: retrievedMovie.name,
            createdBy: retrievedMovie.created_by,
            createdAt: retrievedMovie.createdAt,
            updatedAt: retrievedMovie.updatedAt,
        };
    }
}
exports.default = MovieHelper;
