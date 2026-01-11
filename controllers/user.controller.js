import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const getUser = async (req, res, next) => {
  const userId = req.user.id;

  const validUser = await User.findOne({ _id: userId });

  if (!validUser) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const { password: pass, ...rest } = validUser._doc;

  res.status(200).json(rest);
};

export const signout = async (req, res, next) => {
   try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out successfully");
  } catch (error) {
    next(error);
  }
};
