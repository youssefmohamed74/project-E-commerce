import mongoose, { Types } from "mongoose";

// Schema
const SubCategorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short subcategory name"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { TimesTamps: true, versionKey: false }
);

//  model
export const subcategory = mongoose.model("Subcategory", SubCategorySchema);
