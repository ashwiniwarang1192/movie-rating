/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/prefer-default-export */
import * as httpContext from 'express-http-context';
import { Response } from 'express';
import { HttpStatus } from '../utils/require';
import { UNHANDLED_ERROR } from '../utils/response/Enums';
import BaseError from '../utils/lib/errorHandler/BaseError';

export const handleAndLogError = async (error: BaseError, res: Response): Promise<Response> => {
  try {
    return res.status(error.getErrorResponse().httpCode).send(error.getErrorResponse().response);
  } catch (err) {
    return res.status(HttpStatus.ERROR_500).send(UNHANDLED_ERROR);
  }
};
