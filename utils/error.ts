class BaseError extends Error {
  statusCode: Number;
  isOperational: Boolean;
  constructor(
    name: string,
    statusCode: Number,
    isOperational: boolean,
    description: string
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends BaseError {
  constructor(
    name: string,
    statusCode: Number = 404,
    isOperational: boolean = true,
    description: string = "Not Found"
  ) {
    super(name, statusCode, isOperational, description);
  }
}
