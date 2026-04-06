import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import {User} from "../models/user.model.js";

const authentication = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  const token = req.cookies?.accessToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1]  : null);
  if (!token) {
    throw new ApiError(401, "Unauthorized user");
  }

  const decodedToken = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id).select( "-password -refreshToken");

  if (!user) {
    throw new ApiError(401, "Invalid access token");
  }

  req.user = user;

  next();
});

export {authentication};