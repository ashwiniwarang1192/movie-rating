"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const require_1 = require("../utils/require");
const CustomErrors_1 = require("../utils/response/CustomErrors");
function validateRequest(schema) {
    return (request, response, next) => {
        var _a, _b, _c;
        let result = schema.validate(request);
        console.log(result, 'result gere');
        const { error } = schema.validate(request);
        if (error) {
            console.log(error);
            if (error.message === 'INVALID_INPUT') {
                return CustomErrors_1.default.handleError(response, new require_1.CustomError(require_1.ErrorTypes.VALIDATION_ERROR, require_1.HttpStatus.ERROR_400, require_1.StatusCode.ERROR_2006, 'Request has invalid/empty data'));
            }
            return response.status(require_1.HttpStatus.ERROR_400).send({
                statusCode: require_1.StatusCode.ERROR_400,
                statusType: require_1.ResponseStatus.ERROR,
                statusMessage: ((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.replace(/"/gi, '')) || (error === null || error === void 0 ? void 0 : error.message),
            });
        }
        return next();
    };
}
exports.default = validateRequest;
