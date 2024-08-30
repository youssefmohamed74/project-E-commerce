import { Router } from "express";
import { SignUp, SignIn, ChangeUserPassword } from "./Auth.controller.js";
import { CheckEmail } from "../../middleware/CheckEmail.js";

const AuthRouter = Router();
// register user and check email
AuthRouter.route("/").post(CheckEmail, SignUp);
// login user
AuthRouter.route("/").post(SignIn);
//ChangeUserPassword
AuthRouter.route("/change-Password").patch(ChangeUserPassword);

export default AuthRouter;
