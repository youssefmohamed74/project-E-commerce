import mongoose from "mongoose";

// Schema
const categorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: [true, "name is required"],
      required: true,
      trim: true,
      minlength: [2, "too short category name"],
    },
    Slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    Image: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

//image category
categorySchema.post("init", function (doc) {
  doc.Image = process.env.BASE_URL + "Category/" + doc.Image;
});

//  Model
export const Category = mongoose.model("Category", categorySchema);
