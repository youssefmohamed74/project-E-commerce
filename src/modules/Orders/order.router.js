import { Router } from "express";

import {
  AddOrder,
  GetAllUser,
  GetUserOrder,
  CreateCheckout,
} from "./order.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const OrderRouter = Router();
// add order
OrderRouter.route("/:id").post(protectedRoutes, AllowedTo("User"), AddOrder);
// get all order
OrderRouter.route("/").get(protectedRoutes, AllowedTo("Admin"), GetAllUser);
// get user order
OrderRouter.route("/users").get(
  protectedRoutes,
  AllowedTo("Admin"),
  GetUserOrder
);
// create check out order
OrderRouter.route("/checkout/:id").post(
  protectedRoutes,
  AllowedTo("User"),
  CreateCheckout
);

export default OrderRouter;
