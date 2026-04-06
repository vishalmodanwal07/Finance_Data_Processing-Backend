import { ApiError } from "../utils/api-error.js";

const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, `Access denied. Required roles: ${roles.join(", ")}`)
      );
    }

    next();
  };
};

export {authorization};