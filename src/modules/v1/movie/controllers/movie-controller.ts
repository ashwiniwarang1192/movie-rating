/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import ListService from '../services/ListService';
import { formattedApiResponses } from '../../../common/services/helper';
// eslint-disable-next-line import/no-relative-packages
import { logger } from '../../../../utils/require';

const listObject = new ListService()
export async function getMovieListing(request: Request, response: Response, next: NextFunction) {
  const apiResponse = await listObject.getMovieListing(request?.query);
  return formattedApiResponses(response, apiResponse);
}

export async function getGenreListing(request: Request, response: Response, next: NextFunction) {
  const apiResponse = await listObject.getGenreListing();
  console.log('apiResponse',apiResponse)
  return formattedApiResponses(response, apiResponse);
}

