import { Coupon } from "../../../DataBase/model/coupon.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { DeleteOne } from "../Handlers/handlers.js";
import { AppError } from "../utils/App.Error.js";

// Add Coupon
export const AddCoupon = CatchError(async (req, res, next) => {
 // Check Coupon
  let IsExist = await Coupon.findOne({Code:req.body.Code})
  if(IsExist) return next(new AppError('Coupon already exists' , 409))
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.json({ success: true, message: "Added Coupon Successfully", coupon });
});
// All Coupons
export const AllCoupon = CatchError(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);
  coupon || next(new AppError("Coupon Not Found", 404));
  !coupon || res.json({ success: true, message: "All Coupons Successfully", coupon });
});
// Get One Coupon
export const GetOneCoupon = CatchError(async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);
  coupon || next(new AppError("Coupon Not Found", 404));
  !coupon ||res.json({ success: true, message: "Get One Coupon Successfully", coupon });
});
// Update Coupon
export const UpdateCoupon = CatchError(async (req, res, next) => {
  let coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {new: true});
  coupon || next(new AppError("Coupon Not Found", 404));
  !coupon || res.json({ success: true, message: "Update Coupon Successfully" });
});
// Delete Coupon
export const DeleteCoupon = DeleteOne(Coupon);
