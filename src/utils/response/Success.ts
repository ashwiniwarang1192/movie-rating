import {
  ResponseStatus, StatusCode, ResponseFormat,
} from './Enums';

/**
 * Base class for all Error classes
 * Child classes have to follow this structure
 * Syntax of invoking this class :
 * new Success(StatusCode.SUCCESS_1001, 'Success Message',{id:'abc23vc23ge23'})
 */
export default class Success implements ResponseFormat {
  statusMessage: string;

  statusCode: StatusCode = StatusCode.SUCCESS_1001;

  statusType: ResponseStatus = ResponseStatus.SUCCESS;

  args?: object;

  /**
   * @param statusCode : PRETR defined status codes
   * @param statusMessage : Message to be displayed to origin
   * @param args : Extra details part of success. should be in object format
   */
  constructor(
    statusCode: StatusCode,
    statusMessage: string,
    args?,
  ) {
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;

    // eslint-disable-next-line no-constructor-return
    return { ...this, ...args } as this;
  }

  /**
   * This function can be used to modify the success handling logic in future
   *   init = () => { }
   */
}
