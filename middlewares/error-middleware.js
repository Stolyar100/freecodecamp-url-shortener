import ApiError from "../exceptions/api-error.js";

const ErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ message: "Unexpected Error" });
};

export default ErrorMiddleware;
