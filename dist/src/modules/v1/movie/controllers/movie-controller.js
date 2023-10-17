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
exports.getGenreListing = exports.getMovieListing = void 0;
const ListService_1 = require("../services/ListService");
const helper_1 = require("../../../common/services/helper");
const listObject = new ListService_1.default();
function getMovieListing(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiResponse = yield listObject.getMovieListing(request === null || request === void 0 ? void 0 : request.query);
        return helper_1.formattedApiResponses(response, apiResponse);
    });
}
exports.getMovieListing = getMovieListing;
function getGenreListing(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiResponse = yield listObject.getGenreListing();
        console.log('apiResponse', apiResponse);
        return helper_1.formattedApiResponses(response, apiResponse);
    });
}
exports.getGenreListing = getGenreListing;
