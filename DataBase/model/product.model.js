import mongoose, { Types } from "mongoose";

// Schema
const ProductSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minlength: [2, "too short product name"],
    },
    Slug: {
      type: String,
      lowercase: true,
    },
    Description: {
      type: String,
      required: true,
      minlength: 30,
      max: 200,
    },
    ImageCover: String,
    Images: [String],
    Price: {
      type: Number,
      required: true,
      minlength: 0,
    },
    Discount: {
      type: Number,
      required: true,
      minlength: 0,
    },
    Sold: Number,
    Stock: {
      type: Number,
      minlength: 0,
      required: true,
    },
    Category: {
      type: Types.ObjectId,
      ref: "category",
      required: true,
    },
    SubCategory: {
      type: Types.ObjectId,
      ref: "subcategory",
      required: true,
    },
    Brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: true,
    },
    RateNumber: {
      type: Number,
      required: true,
    },
    RateAvg: {
      type: Number,
      minlength: 0,
      required: true,
      max: 5,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false, toJSON: { virtual: true }, id: false }
);

// virtual
ProductSchema.virtual("My Reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "Product",
});

// populate
ProductSchema.pre("findOne", function () {
  this.populate("My Reviews");
});

// Images And CoverImages
ProductSchema.post("init", function (doc) {
  if (doc.ImageCover)
    doc.ImageCover = process.env.BASE_URL + "Product/" + doc.ImageCover;
  if (doc.Images)
    doc.Images = doc.Images.map(
      (Img) => process.env.BASE_URL + "Product/" + Images
    );
});

// model
export const Product = mongoose.model("Product", ProductSchema);
