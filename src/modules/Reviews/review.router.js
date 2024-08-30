import { Router } from "express";
import {
  AddReview,
  GetAllReview,
  GetOneReview,
  UpdateReview,
  DeleteReview,
} from "./review.controller.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const ReviewRouter = Router();
// add review
ReviewRouter.route("/").post(protectedRoutes, AllowedTo("User"), AddReview);
// get all review
ReviewRouter.route("/").get(GetAllReview);
//get one review
ReviewRouter.route("/:id").get(GetOneReview);
// update review
ReviewRouter.route("/:id").put(
  protectedRoutes,
  AllowedTo("User"),
  UpdateReview
);
// delete review
ReviewRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("User", "Admin"),
  DeleteReview
);

export default ReviewRouter;
