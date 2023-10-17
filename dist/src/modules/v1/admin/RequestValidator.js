"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMovieDetails = void 0;
const Joi = require("joi");
exports.insertMovieDetails = Joi.object().keys({
    name: Joi.object().keys({
        name: Joi.string().required(),
    }),
    director: Joi.object().keys({
        director: Joi.string().required(),
    }),
    genre: Joi.object().keys({
        genre: Joi.array().items(Joi.string()).required(),
    }),
    imdb_score: Joi.object().keys({
        imdb_score: Joi.number().required(),
    }),
    '99popularity': Joi.object().keys({
        '99popularity': Joi.number().required(),
    }),
    createdBy: Joi.object().keys({
        createdBy: Joi.string().required(),
    }),
}).unknown(true);
