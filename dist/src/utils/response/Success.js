"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
/**
 * Base class for all Error classes
 * Child classes have to follow this structure
 * Syntax of invoking this class :
 * new Success(StatusCode.SUCCESS_1001, 'Success Message',{id:'abc23vc23ge23'})
 */
class Success {
    /**
     * @param statusCode : PRETR defined status codes
     * @param statusMessage : Message to be displayed to origin
     * @param args : Extra details part of success. should be in object format
     */
    constructor(statusCode, statusMessage, args) {
        this.statusCode = Enums_1.StatusCode.SUCCESS_1001;
        this.statusType = Enums_1.ResponseStatus.SUCCESS;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        // eslint-disable-next-line no-constructor-return
        return Object.assign(Object.assign({}, this), args);
    }
}
exports.default = Success;
