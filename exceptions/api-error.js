class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static InvalidUrl() {
    return new ApiError(404, "invalid short url");
  }

  static InvalidOriginalUrl() {
    return new ApiError(400, "invalid url");
  }
}

export default ApiError;
