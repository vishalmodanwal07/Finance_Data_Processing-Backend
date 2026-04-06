import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "viewer",
  });

  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User register successfully By Admin",
      ),
    );
});

const updateUser = asyncHandler(async (req, res) => {
    const { name, role, isActive } = req.body;
    const id = req.params.id;

    if (id === req.user._id.toString() && role) {
    throw new ApiError(400, "You cannot change your own role");
  }
    const updateFields = {};
  if (name !== undefined)     updateFields.name = name;
  if (role !== undefined)     updateFields.role = role;
  if (isActive !== undefined) updateFields.isActive = isActive;
   
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No valid fields provided to update");
  }

  const user = await User.findByIdAndUpdate(
      id,
    { $set: updateFields },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

    if (!user) {
    throw new ApiError(404, "User not found");
  }

   return res
         .status(200)
         .json(
         new ApiResponse(200, { user }, "User updated successfully")
        );

});

const deleteUser = asyncHandler(async (req, res) => {
   const id = req.params.id;

    if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete your own account");
    }

     const user = await User.findByIdAndDelete(id);

      if (!user) {
          throw new ApiError(404, "User not found");
        }
      return res
            .status(200)
            .json(
             new ApiResponse(204, {}, "User deleted successfully")
     );



});

const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const { role, isActive, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === "true";
  const skip = (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    User.find(filter)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
      "Users fetched successfully",
    ),
  );
});

const toggleUserStatus = asyncHandler(async (req , res) => {
  const id = req.params.id;

   if (id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot deactivate your own account");
  }
  
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = !user.isActive;
  await user.save({ validateBeforeSave: false });

   return res
         .status(200)
        .json(
           new ApiResponse(
              200,
          { isActive: user.isActive },
         `User ${user.isActive ? "activated" : "deactivated"} successfully`
    )
  );

});

export {
         createUser,
         updateUser,
         deleteUser,
         getUser,
         getAllUsers,
         toggleUserStatus
         
         


}