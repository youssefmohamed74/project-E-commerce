import { Cart } from "../../../DataBase/model/cart.model.js";
import { Order } from "../../../DataBase/model/order.model.js";
import { Product } from "../../../DataBase/model/product.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);

export const AddOrder = CatchError(async (req, res, next) => {
  // Get User Cart Order
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));
  // total cart price
  let TotalOrderPrice = Cart.TotalCartPriceAfterDiscount || Cart.TotalCartPrice;
  // create order
  let order = new Order({
    User: req.User._id,
    OrderItems: Cart.CartItems,
    ShippingAddress: req.body.ShippingAddress,
    TotalOrderPrice,
  });
  await order.save();
  //Increment sold & decrement stock
  let options = Cart.CartItems.map((prod) => {
    return;
    ({
      updateOne: {
        filter: { _id: prod.Product },
        update: { $inc: { sold: prod.Quantity, stock: -prod.Quantity } },
      },
    });
  });
  await Product.bulkWrite(options);
  // clear user cart
  await Cart.findByIdAndDelete(Cart._id);
  //response
  response.json({ success: true, message: "added order successfully", order });
});
// get user order
export const GetUserOrder = CatchError(async (req, res, next) => {
  let order = await Order.findOne({ User: req.User._id }).populate(
    "OrderItems.Product"
  );
  res.json({ success: true, message: "Get User Order successfully", order });
});
// Get All User
export const GetAllUser = CatchError(async (req, res, next) => {
  let order = await Order.find({});
  res.json({
    success: true,
    message: "Get All User Order successfully",
    order,
  });
});
// create checkout
export const CreateCheckout = CatchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));

  let TotalOrderPrice = Cart.TotalCartPriceAfterDiscount || Cart.TotalCartPrice;

  let session = await Stripe.Checkout.session.create({
    line_items: [
      {
        price_date: {
          currency: "egp",
          unit_amount: TotalOrderPrice * 100,
          product_date: {
            name: req.User.Name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://hambozoo.netlify.app/#/order",
    cancel_url: "https://hambozoo.netlify.app/#/cart",

    customer_email: req.User.Email,
    client_reference_id: req.params.id,
    metadata: req.body.ShippingAddress,
  });

  res.json({
    success: true,
    message: "created checkout successfully",
    session,
  });
});
