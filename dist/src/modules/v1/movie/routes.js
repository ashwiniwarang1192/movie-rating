"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const movieController = require("./controllers/movie-controller");
const routes = [
    {
        path: '/listing',
        method: 'get',
        action: movieController.getMovieListing
    },
    {
        path: '/genre/listing',
        method: 'get',
        action: movieController.getGenreListing
    }
];
exports.default = routes;
