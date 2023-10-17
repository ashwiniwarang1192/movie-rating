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
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
const require_1 = require("../../../../utils/require");
const helper_1 = require("../../../common/services/helper");
const mongo_1 = require("../../../common/models/mongo");
class ListService {
    /**
     * Will retrieve all movies from db
     */
    getPagination(pageNumber = 1, limit = 10) {
        const startIndex = (pageNumber - 1) * limit;
        return { startIndex, limit };
    }
    getSortOptions(queryParams) {
        var _a;
        const sortByColumn = '_id';
        const { sortBy, orderBy } = queryParams;
        return {
            sortBy: sortBy ? ((_a = helper_1.columnParamMapping === null || helper_1.columnParamMapping === void 0 ? void 0 : helper_1.columnParamMapping[sortBy]) === null || _a === void 0 ? void 0 : _a.columnName) : sortByColumn,
            orderBy: (orderBy && orderBy == 'ASC') ? 1 : -1,
        };
    }
    getFilterData(queryParams) {
        const { genre } = queryParams;
        const condArr = (genre) ? genre.split(',') : [];
        const condition = {
            genre: { $in: condArr }
        };
        return condition;
    }
    getSearchOptions(queryParams) {
        const { searchText } = queryParams;
        if (!searchText)
            return {};
        const condition = { '$or': [
                { name: { "$regex": searchText, "$options": 'i' } },
                { director: { "$regex": searchText, "$options": 'i' } }
            ] };
        return condition;
    }
    getMovieListing(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filterCondition = {};
                const { startIndex, limit } = this.getPagination(queryParams === null || queryParams === void 0 ? void 0 : queryParams.page, queryParams === null || queryParams === void 0 ? void 0 : queryParams.pageSize);
                const { sortBy, orderBy } = this.getSortOptions(queryParams);
                const seachCondition = this.getSearchOptions(queryParams);
                if (queryParams === null || queryParams === void 0 ? void 0 : queryParams.genre) {
                    filterCondition = this.getFilterData(queryParams);
                }
                const mergedConditions = Object.assign(Object.assign({}, seachCondition), filterCondition);
                console.log('mergedConditions', mergedConditions);
                const mySort = { [sortBy]: orderBy };
                console.log("sortBy", sortBy, "orderBy", orderBy, 'mySort', { [sortBy]: orderBy }, 'condition', mergedConditions);
                const totalPosts = yield mongo_1.Movies.countDocuments().exec();
                const data = yield mongo_1.Movies.find(mergedConditions)
                    .sort(mySort)
                    .skip(startIndex)
                    .limit(limit)
                    .exec();
                const totalPages = Math.ceil(totalPosts / limit);
                return helper_1.successResponse({
                    statusMessage: 'Movie listing(s) retrieved successfully',
                    totalPages,
                    data,
                });
            }
            catch (error) {
                console.error(`Failed to return movie listing : ${JSON.stringify(queryParams)}, error : ${error.stack}`);
                console.log('Order Lists : ', { queryParams, error });
                return require_1.CustomError.returnStandardErrorResponse(error);
            }
        });
    }
    getGenreListing() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield mongo_1.Genre.find();
                return helper_1.successResponse({
                    statusMessage: 'Movie listing(s) retrieved successfully',
                    data,
                });
            }
            catch (error) {
                console.error(`Failed to return movie listing : error : ${error.stack}`);
                return require_1.CustomError.returnStandardErrorResponse(error);
            }
        });
    }
}
exports.default = ListService;
