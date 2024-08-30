import { Cart } from "../../../DataBase/model/cart.model.js";
import { Coupon } from "../../../DataBase/model/coupon.model.js";
import { Product } from "../../../DataBase/model/product.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";

function CalcTotalPrice(IsCartExist) {
  IsCartExist.TotalCartPrice = IsCartExist.CartItems.reduce(
    (prev, item) => (prev += item.Quantity * item.Price),
    0
  );

  if (IsCartExist.Discount) {
    IsCartExist.TotalCartPriceAfterDiscount =
      IsCartExist.TotalCartPrice -
      (IsCartExist.TotalCartPrice * IsCartExist.Discount) / 100;
  }
}

// Add Cart
export const AddCart = CatchError(async (req, res, next) => {
  let IsCartExist = await Cart.findOne({ User: req.User._id });
  let product = await Product.findById(req.body.Product);
  if (!product) return next(new AppError("Product Not Found", 404));
  req.body.price = Product.price;
  if (req.body.Quantity > Product.Stock)
    return next(new AppError("Sold Out", 404));

  if (!IsCartExist) {
    let cart = new Cart({
      User: req.User._id,
      CartItems: [req.body],
    });
    CalcTotalPrice(Cart);
    await cart.save();
    req.json({ success: true, message: "Added Cart Successfully", cart });
  } else {
    let item = IsCartExist.CartItems.find(
      (item) => item.Product == req.body.Product
    );
    if (item) {
      item.Quantity += req.body.Quantity || 1;
      if (item.Quantity > Product.Stock)
        return next(new AppError("Sold Out", 404));
    }
    if (!item) IsCartExist.CartItems.push(req.body);
    CalcTotalPrice(IsCartExist);
    await IsCartExist.save();
    res.json({ success: true, message: "Cart", cart: IsCartExist });
  }
});
//Update Cart
export const UpdateQuantityCart = CatchError(async (req, res, next) => {
  let cart = await Cart.findOne({ User: req.User._id });

  let item = Cart.CartItems.find((item) => item.Product == req.params.id);
  if (!item) return next(new AppError("Product Not Found", 404));

  item.Quantity = req.body.Quantity;
  CalcTotalPrice(Cart);
  await cart.save();
  res.json({ success: true, message: "Successfully updated quantity", cart });
});
// Remove Cart
export const RemoveItemsCart = CatchError(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { User: req.User._id },
    { $pull: { CartItems: { _id: req.params.id } } },
    { new: true }
  );
  CalcTotalPrice(Cart);
  await cart.save();
  cart || next(new AppError("Cart Not Found", 404));
  cart || res.json({ success: true, message: "Successfully removed", cart });
});
// Get Logged User Cart
export const GetLoggedUserCart = CatchError(async (req, res, next) => {
  let cart = await Cart.findOne({ User: req.User._id });
  !cart || res.json({ success: true, message: "Logged Successfully", cart });
});
// Clear User Cart
export const ClearUserCart = CatchError(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ User: req.User._id });
  res.json({ success: true, message: "clear Successfully", cart });
});
// Apply Coupon
export const ApplyCoupon = CatchError(async (req, res, next) => {
  let coupon = await Coupon.findOne({
    Code: req.body.Code,
    ExpireDate: { $gta: Date.now() },
  });
  if (!coupon) return next(new AppError("Opps Coupon InValid", 404));
  let cart = await Cart.findOne({ User: req.User._id });
  Cart.Discount = Coupon.Discount;
  await cart.save();
  res.json({ success: true, message: "Success ", cart });
});
