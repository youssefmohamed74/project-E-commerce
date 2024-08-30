import { Router } from "express";
import {
  AddToWishlist,
  GetLoggedUserWishlist,
  RemoveFromWishlist,
} from "./wishlist.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const WishlistRouter = Router();
// update the wishlist
WishlistRouter.route("/").patch(
  protectedRoutes,
  AllowedTo("User"),
  AddToWishlist
);
// GetLoggedUserWishlist
WishlistRouter.route("/").get(
  protectedRoutes,
  AllowedTo("User"),
  GetLoggedUserWishlist
);
// RemoveFromWishlist
WishlistRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("User", "Admin"),
  RemoveFromWishlist
);

export default WishlistRouter;
