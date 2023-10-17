export interface ResponseType {
  statusCode: number,
  statusMessage: string,
  statusType: string,
  status: string,
  message: string
}

export interface ResponseObjectType {
  httpCode: number,
  response: ResponseType,
}

export interface ResponseDataType {
  httpCode: number,
  response: ResponseType,
  additionalField: string[]
}

export interface EndPoint {
  [code: number]: ResponseDataType
}

export interface ResponseCollectionType {
  endPoint ?: EndPoint
}
