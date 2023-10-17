import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import {
  logger, CustomError, ErrorTypes, ResponseStatus, HttpStatus, StatusCode,
} from '../utils/require';
import CustomErrors from '../utils/response/CustomErrors';

export default function validateRequest(schema: Joi.Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
      let result = schema.validate(request)
      console.log(result,'result gere')
    const { error } = schema.validate(request);
    if (error) {
      console.log(error);
      if (error.message === 'INVALID_INPUT') {
        return CustomErrors.handleError(response, new CustomError(ErrorTypes.VALIDATION_ERROR, HttpStatus.ERROR_400, StatusCode.ERROR_2006, 'Request has invalid/empty data'));
      }
      return response.status(HttpStatus.ERROR_400).send({
        statusCode: StatusCode.ERROR_400,
        statusType: ResponseStatus.ERROR,
        statusMessage: error?.details?.[0]?.message?.replace(/"/gi, '') || error?.message,
      });
    }
    return next();
  };
}
