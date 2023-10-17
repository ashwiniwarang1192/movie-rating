import * as httpContext from 'express-http-context';
import merge = require('lodash/merge');
import { EndPoint, ResponseObjectType } from './ResponseType';
import wordleResponses = require('./WordleResponses.json');

export default class WordleResponse {
  static send(code: number, data = {}): ResponseObjectType {
    if (!httpContext.get('identifier')) {
      return {
        httpCode: 500,
        response: {
          statusCode: 500,
          statusMessage: 'Error while creating post',
          statusType: 'ERROR',
          message: 'Error while creating post',
          status: 'error',
        },
      };
    }
    const response = JSON.parse(JSON.stringify(WordleResponse.getData()[code])) as ResponseObjectType;
    merge(response?.response, data);
    return response;
  }

  private static getData(): EndPoint {
    return wordleResponses[httpContext.get('identifier') as string] as EndPoint;
  }
}
