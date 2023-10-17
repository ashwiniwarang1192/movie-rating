"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movieController = require("./controllers/movie-controller");
const requestValidation_1 = require("../../../hooks/requestValidation");
const validatorFor = require("./RequestValidator");
const routes = [
    {
        path: '/movie',
        method: 'get',
        action: movieController.getMovie
    },
    {
        path: '/movie',
        method: 'post',
        action: movieController.addMovie,
        hook: requestValidation_1.default(validatorFor.insertMovieDetails),
    },
    {
        path: '/movie/:movieId',
        method: 'put',
        action: movieController.updateMovie
    },
    {
        path: '/movie',
        method: 'delete',
        action: movieController.deleteMovie
    },
    {
        path: '/movie/genre',
        method: 'post',
        action: movieController.addGenre
    }
];
exports.default = routes;
