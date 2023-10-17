"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.pluralize(null);
const metaInfo = new mongoose.Schema({}, { strict: false, timestamps: true });
exports.default = mongoose.model('meta_info', metaInfo);
