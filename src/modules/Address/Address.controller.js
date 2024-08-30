import { User } from "../../../DataBase/model/user.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";

//Add address
export const AddAddress = CatchError(async (rew, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.User._id,
    { $push: { Address: req.body } },
    { new: true }
  );
  address || next(new AppError("Address not Found", 404));
  address ||
    res.json({ success: true, message: "Added Address Successfully", address });
});
// Get Logged User address
export const GetLoggedUserAddress = CatchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.User._id,
    { $pull: { Address: { _id: req.params.id } } },
    { new: true }
  );
  address || next(new AppError("Address not Found", 404));
  address ||
    res.json({ success: true, message: "Get Address Successfully", address });
});
// Remove address
export const RemoveAddress = CatchError(async (req, res, next) => {
  let address = await User.findById(req.User._id);
  address || next(new AppError("Address not Found", 404));
  address ||
    res.json({
      success: true,
      message: "Remove Address Successfully",
      address,
    });
});
