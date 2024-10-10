import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const registerUser =asyncHandler( async (req, res) => {
  //signup
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "Fileds Are Empty");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(409, "User Already Exist");
  }
  const user = await User.create({ name, email, password });
  const userCreated = await User.findById(user._id).select("-password");
  res
    .status(200)
    .send(user)
    .json(new ApiResponse(201, userCreated, "User Created Successfully"));
});
export { registerUser };
