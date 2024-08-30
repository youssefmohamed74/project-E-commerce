import { CatchError } from "../../middleware/CatchError.js";
import { Review } from "../../../DataBase/model/review.model.js";
import { AppError } from "../utils/App.Error.js";
import { DeleteOne } from "../Handlers/handlers.js";

// Add Review
export const AddReview = CatchError(async (req, res, next) => {
  req.body.User = req.User._id;
  let IsExist = await Review.findOne({
    User: req.User._id,
    Product: req.body.Product,
  });
  if (IsExist) return next(new AppError("You Create a Review Before", 409));
  let review = new Review(req.body);
  await review.save();
  res.json({ success: true, message: "Added Review Successfully", review });
});
//Get All Review
export const GetAllReview = CatchError(async (req, res, next) => {
  let review = await Review.find();
  res.json({ success: true, message: "Get All Review Successfully", review });
});
// Get One Review
export const GetOneReview = CatchError(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  review || next(new AppError("Review not found", 404));
  review ||
    res.json({ success: true, message: "Get One Review Successfully", review });
});
//Update a review
export const UpdateReview = CatchError(async (req, res, next) => {
  let review = await Review.findOneAndUpdate(
    { _id: req.params.id, User: req.User._id },
    req.body,
    { new: true }
  );
  review ||
    next(new AppError("Review not found or you are created review", 404));
  review ||
    res.json({ success: true, message: "Update Review Successfully", review });
});
// Delete a review
export const DeleteReview = DeleteOne(Review);
