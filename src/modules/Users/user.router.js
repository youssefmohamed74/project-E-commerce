import { Router } from "express";
import {
  AddUser,
  AllUser,
  GetOneUser,
  UpdateUser,
  DeleteUser,
} from "./user.controller.js";
import { CheckEmail } from "../../middleware/CheckEmail.js";

const UserRouter = Router();
// add user
UserRouter.route("/").post(CheckEmail, AddUser);
// get all user
UserRouter.route("/").get(AllUser);
// get one user
UserRouter.route("/:id").get(GetOneUser);
// delete user
UserRouter.route("/:id").get(DeleteUser);
// update user
UserRouter.route("/:id").put(UpdateUser);

export default UserRouter;
