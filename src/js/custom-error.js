class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
  }
}

class ApiError extends Error {
  constructor(status) {
    super(errorCode);
    this.name = 'ApiError';
    this.status = errorCode;
  }
}
