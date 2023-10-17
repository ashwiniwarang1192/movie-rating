"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const httpContext = require("express-http-context");
const lodash_2 = require("lodash");
class CustomResponse {
    static flattenObject(obj, prefix = '') {
        return Object.keys(obj).reduce((acc, k) => {
            const pre = prefix.length ? prefix + '.' : '';
            if (obj[k] === null) {
                acc[pre + k] = null;
            }
            else if (typeof obj[k] === 'object' && !Array.isArray(obj[k]))
                Object.assign(acc, CustomResponse.flattenObject(obj[k], pre + k));
            else
                acc[pre + k] = obj[k];
            return acc;
        }, {});
    }
    static partner(code, msg = '') {
        let response = CustomResponse.getData('PARTNER');
        try {
            response = response[code + ''];
            if ('additionalField' in response) {
                let newRes = CustomResponse.flattenObject(lodash_2.find(msg, 'response'));
                response.additionalField.map((ele) => {
                    if (!lodash_2.isUndefined(newRes[ele.field])) {
                        response.response[ele.value] = newRes[ele.field];
                    }
                });
                return response;
            }
        }
        catch (err) {
            console.log(err);
            return response[500];
        }
        return response;
    }
    static storefront(type, msg = '') {
        const routeVersion = httpContext.get('routeVersion');
        let response = JSON.parse(JSON.stringify(CustomResponse.getData(routeVersion)));
        response = response[type];
        if (!lodash_1.isEmpty(msg)) {
            response.response.statusMessage = msg;
        }
        return response;
    }
    static getData(type) {
        const identifier = httpContext.get('identifier');
        const partner = CustomResponse.fileMapping[type];
        if (partner && partner[identifier]) {
            return partner[identifier];
        }
        // return partner[identifier];
    }
}
exports.default = CustomResponse;
CustomResponse.fileMapping = {
    PARTNER: {},
};
