import mongoose from "mongoose";

// Schema
const BrandSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minlength: [2, "too short brand name"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    Logo: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

// logo brand
BrandSchema.post("init", function (doc) {
  doc.Logo = process.env.BASE_URL + "Brand/" + doc.Logo;
});

//  model
export const Brand = mongoose.model("Brand", BrandSchema);
