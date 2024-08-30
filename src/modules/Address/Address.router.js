import { Router } from "express";
import {
  AddAddress,
  GetLoggedUserAddress,
  RemoveAddress,
} from "./Address.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const AddressRouter = Router();
//Update address
AddressRouter.route("/").patch(protectedRoutes, AllowedTo("User"), AddAddress);
// GetLoggedUserAddress
AddressRouter.route("/").get(
  protectedRoutes,
  AllowedTo("User"),
  GetLoggedUserAddress
);
// delete address
AddressRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("User", "Admin"),
  RemoveAddress
);

export default AddressRouter;
