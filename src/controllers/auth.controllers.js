import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";

const generateAccessAndRefreshTokens = async (userId) =>{
    try {
      const user =  await User.findById(userId);
      const accessToken =  user.generateAccessToken();
      const refreshToken =  user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({validateBeforeSave : false});
      return {accessToken , refreshToken}
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

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

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

const login = asyncHandler(async (req , res) => {
  const {email , password} =  req.body;
   if(!email){
    throw new ApiError(400 , "email is required");
   }

   const user =   await User.findOne({email});
    if(!user){
    throw new ApiError(400 , "user does not exist");
   }
   
  const isPasswordValid = await user.isPasswordCorrect(password);
  
  if(!isPasswordValid){
     throw new ApiError(400 , "invalid password");
  }
   
   const { accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id);

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken ");

   if(!loggedInUser){
    throw new ApiError(500 ,"Something went wrong while login");
   }
   
   const options = {
    httpOnly : true,
    secure: true
   }

   return res
         .status(200)
         .cookie("accessToken" , accessToken , options)
         .cookie("refreshToken" , refreshToken , options)
         .json(
            new ApiResponse(
                200,
                {
                    user : loggedInUser,
                    accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
         )
});


export {registerUser,
         login
       }