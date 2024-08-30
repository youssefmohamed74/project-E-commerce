import { Router } from "express";
import {
  AddCart,
  UpdateQuantityCart,
  RemoveItemsCart,
  GetLoggedUserCart,
  ClearUserCart,
  ApplyCoupon,
} from "./cart.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const CartRouter = Router();

// add cart
CartRouter.route("/").post(protectedRoutes, AllowedTo("User"), AddCart);
// update cart
CartRouter.route("/:id").patch(
  protectedRoutes,
  AllowedTo("User"),
  UpdateQuantityCart
);
// delete cart
CartRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("User"),
  RemoveItemsCart
);
// GetLoggedUserCart 
CartRouter.route("/").get(
  protectedRoutes,
  AllowedTo("User"),
  GetLoggedUserCart
);
// ClearUserCart
CartRouter.route("/").delete(protectedRoutes, AllowedTo("User"), ClearUserCart);
// ApplyCoupon 
CartRouter.route("/Apply-Coupon").post(
  protectedRoutes,
  AllowedTo("User"),
  ApplyCoupon
);

export default CartRouter;
