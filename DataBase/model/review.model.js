import mongoose, { Types } from "mongoose";

// Schema
const ReviewSchema = new mongoose.Schema(
  {
    Comment: String,
    User: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    Product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    Rate: {
      type: Number,
      minlength: 0,
      max: 5,
      required: true,
    },
  },
  { TimesTamps: true, versionKey: false }
);

// find reviews => populate
ReviewSchema.pre(/^find/, function () {
  this.populate("User", "Name");
});

// model
export const Review = mongoose.model("Review", ReviewSchema);
