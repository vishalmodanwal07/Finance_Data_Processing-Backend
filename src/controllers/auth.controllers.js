import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";

const generateAccessAndRefreshTokens = async (userId) =>{
    try {
      const user =  await User.findById(userId);
      const acessToken =  user.generateAccessToken();
      const refreshToken =  user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave : false});
      return {acessToken , refreshToken}
    } catch (error) {
        throw new ApiError(500 , "Something went wrong while generating access and refresh token");
    }
}
const registerUser = asyncHandler(async (req , res) =>{
    const {name , email , password , role} = req.body;

   const existedUser =  await User.findOne({email});

   if(existedUser){
     throw new ApiError(409 , "User with this email already exists");
   }

 const user =  await User.create({
    name,
    email,
    password,
    role : role || "viewer"
   });

   await user.save({validateBeforeSave : false});

  const createdUser = await User.findById(user._id).select("-password -refreshToken ");

   if(!createdUser){
    throw new ApiError(500 ,"Something went wrong while registering a user");
   }

   return res
      .status(201)
      .json(
        new ApiResponse(
            201,
            {user : createdUser},
            "User register successfully"
        )
      )
});


export {registerUser}