"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.pluralize(null);
const genre = new mongoose.Schema({}, { strict: false, timestamps: true });
exports.default = mongoose.model('genre', genre);
