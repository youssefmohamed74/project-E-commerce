import mongoose, { Types } from "mongoose";
import bcryptjs from "bcryptjs";
// Schema
const UserSchema = new mongoose.Schema(
  {
    Name: String,
    Email: String,
    Password: String,
    IsBlocked: {
      type: Boolean,
      default: false,
    },
    Role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    PasswordChangeAt: Date,
    Wishlist: [{ type: Types.ObjectId, ref: "Product" }],
    Address: [
      {
        city: String,
        phone: String,
        street: String,
      },
    ],
  },
  { TimesTamps: true, versionKey: false }
);

// save dataBase hash password
UserSchema.pre("save", function () {
  this.Password = bcryptjs.hashSync(this.Password, 8);
});
// save dataBase Update hash password
UserSchema.pre("findOneAndUpdate", function () {
  if (this._Update.Password) bcryptjs.hashSync(this._Update.Password, 8);
});

// model
export const User = mongoose.model("User", UserSchema);
