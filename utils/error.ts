import { HttpStatusCode } from "./statuscode.enum";

export class BaseError extends Error {
  statusCode: number;
  isOperational: Boolean;
  constructor(
    name: string,
    statusCode: number,
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
    statusCode: number = HttpStatusCode.NOT_FOUND,
    isOperational: boolean = true,
    description: string = "Not Found"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(
    name: string,
    statusCode: number = HttpStatusCode.UNAUTHORIZED,
    isOperational: boolean = true,
    description: string = "Unauthorized access"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export class ForbiddenAccessError extends BaseError {
  constructor(
    name: string,
    statusCode: number = HttpStatusCode.FORBIDDEN,
    isOperational: boolean = true,
    description: string = "Forbidded access"
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export class InternalServerError extends BaseError {
  constructor(
    name: string,
    statusCode: number = HttpStatusCode.INTERNAL_SERVER,
    isOperational: boolean = true,
    description: string = "Internal server error"
  ) {
    super(name, statusCode, isOperational, description);
  }
}
