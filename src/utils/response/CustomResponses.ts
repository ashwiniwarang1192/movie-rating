import { isEmpty } from 'lodash';
import * as httpContext from 'express-http-context';
import { find, isUndefined } from 'lodash';

export default class CustomResponse {

  static flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (obj[k] === null) { acc[pre + k] = null }
      else if (typeof obj[k] === 'object' && !Array.isArray(obj[k])) Object.assign(acc, CustomResponse.flattenObject(obj[k], pre + k));
      else acc[pre + k] = obj[k];
      return acc;
    }, {});
  }

  static partner(code: number, msg: any = '') {

    let response = CustomResponse.getData('PARTNER');
    try {

      response = response[code + ''];

      if ('additionalField' in response) {
        let newRes = CustomResponse.flattenObject(find(msg, 'response'));
        response.additionalField.map((ele) => {
          if (!isUndefined(newRes[ele.field])) {
            response.response[ele.value] = newRes[ele.field];
          }
        });
        return response;
      }
    } catch (err) {
      console.log(err);

      return response[500];
    }

    return response;
  }


  static storefront(type: string, msg = '') {
    const routeVersion = httpContext.get('routeVersion');
    let response = JSON.parse(JSON.stringify(CustomResponse.getData(routeVersion)));
    response = response[type];
    if (!isEmpty(msg)) {
      response.response.statusMessage = msg;
    }
    return response;
  }

  private static getData(type: string) {
    const identifier = httpContext.get('identifier');
    const partner = CustomResponse.fileMapping[type];
    if (partner && partner[identifier]) {
      return partner[identifier];
    }
    // return partner[identifier];
  }

  private static fileMapping = {
    PARTNER: {},
  };
}
