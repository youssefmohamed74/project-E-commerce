import { User } from "../../../DataBase/model/user.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// SignUp
export const SignUp = CatchError(async (req, res, next) => {
  let user = new User(req.body);
  await user.save();
  let token = jwt.sign(
    { userId: user._id, Role: user.Role },
    process.env.JWT_KEY
  );
  res.json({ success: true, message: "SignUp User Successfully", token });
});
//SignIn
export const SignIn = CatchError(async (req, res, next) => {
  let user = await User.findOne({ Email: req.body.Email });
  if (user && bcryptjs.compareSync(req.body.Password, user.Password)) {
    let token = jwt.sign(
      { userId: user._id, Role: user.Role },
      process.env.JWT_KEY
    );
    return res.json({
      success: true,
      message: "SignIn User Successfully",
      token,
    });
  }
  next(new AppError("incorrect Email Or Password", 401));
});
// Change User Password
export const ChangeUserPassword = CatchError(async (req, res, next) => {
  let user = await User.findOne({ Email: req.body.Email });
  if (user && bcryptjs.compareSync(req.body.OldPassword, user.Password)) {
    await User.findOneAndUpdate(
      { Email: req.body.Email },
      { Password: req.body.NewPassword },
      { PasswordChangeAt: Date.now() }
    );
    let token = jwt.sign(
      { userId: user._id, Role: user.Role },
      process.env.JWT_KEY
    );
    return res.json({
      success: true,
      message: "Change Password successfully",
      token,
    });
  }
  next(new AppError("incorrect Email or password", 401));
});
// Protected Routes Authentication
export const protectedRoutes = CatchError(async (req, res, next) => {
  // Check token
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("token not provided", 401));
  // verify token
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });
  let user = User.findById(userPayload.userId);
  if (!user) return next(new AppError("user not found", 401));
  if (PasswordChangeAt) {
    let time = parseInt(user.PasswordChangeAt.gettime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("invalid token .. .. login agin", 401));
  }
  req.user = user;
  next();
});
//Allowed To Authorization
export const AllowedTo = (...roles) => {
  return CatchError(async (req, res, next) => {
    if (roles.includes(req.user.Role)) {
      return next();
    }
    return next(
      new AppError("you not Authorized to access this Endpoint", 401)
    );
  });
};
