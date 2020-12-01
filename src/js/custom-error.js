'use strict';

export class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
  }
}

export class ApiError extends Error {
  constructor(errorCode) {
    super(errorCode);
    this.name = 'ApiError';
    this.code = errorCode;
  }
}
