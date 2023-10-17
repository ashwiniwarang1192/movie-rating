import * as express from 'express';
// eslint-disable-next-line import/prefer-default-export,func-names
export const cors = function (
  request: express.Request,
  response: express.Response,
  next: () => void,
) {
  response.header('Access-Control-Allow-Origin', <string>request.headers.origin);
  response.header('Access-Control-Allow-Credentials', 'true');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if (request.method === 'OPTIONS') {
    response.sendStatus(200);
  } else {
    next();
  }
};
