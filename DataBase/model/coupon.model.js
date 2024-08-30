import mongoose from "mongoose";

// Schema
const CouponSchema = new mongoose.Schema(
  {
    Code: {
      type: String,
      unique: true,
      required: true,
    },
    ExpireDate: Date,
    Discount: Number,
  },
  { timestamps: true, versionKey: false }
);

// model
export const Coupon = mongoose.model("Coupon", CouponSchema);
