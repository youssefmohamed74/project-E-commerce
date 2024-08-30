import { User } from "../../DataBase/model/user.model.js";
import { AppError } from "../modules/utils/App.Error.js";

export const CheckEmail = async (req, res, next) => {
  let isExist = await User.findOne({ Email: req.body.Email });
  if (isExist) return next(new AppError("Email Already Exists", 409));
  next();
};
