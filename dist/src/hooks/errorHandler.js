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
exports.handleAndLogError = void 0;
const require_1 = require("../utils/require");
const Enums_1 = require("../utils/response/Enums");
const handleAndLogError = (error, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(error.getErrorResponse().httpCode).send(error.getErrorResponse().response);
    }
    catch (err) {
        return res.status(require_1.HttpStatus.ERROR_500).send(Enums_1.UNHANDLED_ERROR);
    }
});
exports.handleAndLogError = handleAndLogError;
