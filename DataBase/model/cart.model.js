import mongoose, { Types } from "mongoose";

//Schema
const CartSchema = new mongoose.Schema(
  {
    User: { type: Types.ObjectId, ref: "User" },
    CartItems: [
      {
        Product: { type: Types.ObjectId, ref: "Product" },
        Quantity: { type: Number, default: 1 },
        Price: Number,
      },
    ],
    TotalCartPrice: Number,
    Discount: Number,
    TotalCartPriceAfterDiscount: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//model
export const Cart = mongoose.model("Cart", CartSchema);
