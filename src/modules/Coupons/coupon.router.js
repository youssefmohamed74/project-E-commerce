import { Router } from "express";
import {
  AddCoupon,
  AllCoupon,
  GetOneCoupon,
  UpdateCoupon,
  DeleteCoupon,
} from "./coupon.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const CouponRouter = Router();

// add coupon
CouponRouter.route("/").post(protectedRoutes, AllowedTo("Admin"), AddCoupon);
// get all coupon
CouponRouter.route("/").get(protectedRoutes, AllowedTo("Admin"), AllCoupon);
// get one coupon
CouponRouter.route("/:id").get(
  protectedRoutes,
  AllowedTo("Admin"),
  GetOneCoupon
);
// update coupon
CouponRouter.route("/:id").patch(
  protectedRoutes,
  AllowedTo("Admin"),
  UpdateCoupon
);
// delete coupon
CouponRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("Admin"),
  DeleteCoupon
);

export default CouponRouter;
