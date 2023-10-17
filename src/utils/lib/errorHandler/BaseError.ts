export default abstract class BaseError extends Error {
  public statusCode: number;

  public errorName: string;

  constructor(statusCode: number, errorName: string) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.errorName = errorName;
    Error.captureStackTrace(this);
  }

  public abstract getLogData();
  public abstract getStatsPath();
  public abstract getErrorResponse();
}
