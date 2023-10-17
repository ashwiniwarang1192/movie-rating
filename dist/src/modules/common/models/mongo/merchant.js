"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const merchantConfig = new mongoose.Schema({
    access_token: {
        type: 'String',
    },
    refresh_token: {
        type: 'String',
    },
}, { strict: false });
exports.default = mongoose.model('merchants', merchantConfig);
