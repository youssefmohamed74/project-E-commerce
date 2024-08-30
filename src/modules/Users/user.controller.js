import { CatchError } from "../../middleware/CatchError.js";
import { User } from "../../../DataBase/model/user.model.js";
import { AppError } from "../utils/App.Error.js";
import { DeleteOne } from "../Handlers/handlers.js";

//  Add User
export const AddUser = CatchError(async (req, res, next) => {
  let user = new User(req.body);
  await user.save();
  res.json({ success: true, message: "Added User Successfully", user });
});
// AllUsers
export const AllUser = CatchError(async (req, res, next) => {
  let user = await User.find();
  res.json({ success: true, message: "Get All Users Successfully", user });
});
// GetOneUsers
export const GetOneUser = CatchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  user || next(new AppError("user not fount", 404));
  !user ||
    res.json({ success: true, message: "Get One User Successfully", user });
});
// Update User
export const UpdateUser = CatchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  user || next(new AppError("user not fount", 404));
  !user ||
    res.json({ success: true, message: "Update User Successfully", user });
});
// Delete User
export const DeleteUser = DeleteOne(User);
