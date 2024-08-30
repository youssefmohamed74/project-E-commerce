import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DataBase/connection.js";
import { BootStrap } from "./src/modules/BootStrap.js";
import { GlobalError } from "./src/middleware/GlobalError.js";
import { AppError } from "./src/modules/utils/App.Error.js";
import cors from "cors";
import { CatchError } from "./src/middleware/CatchError.js";
import Stripe from "stripe";
import { Order } from "./DataBase/model/order.model.js";
import { Cart } from "./DataBase/model/cart.model.js";
import { User } from "./DataBase/model/user.model.js";
import { Product } from "./DataBase/model/product.model.js";
const stripe = new Stripe(process.env.SECRET_KEY);

dotenv.config();
const app = express();

app.post('/api/webhook' , express.raw({type:"/application/json"}) ,CatchError(async(req , res) =>
{
  const sig = req.headers['stripe-signature'].toString()
  let event = Stripe.webhooks.constructEvent(req.body,sig,"whsec_nznptOO76TcKGtBo30mAmkhe8bkzLowN")
  let checkout
  if(event.type == "checkout.session.completed")
  {
    checkout = event.data.object

    let user = await User.findOne({Email:checkout.customer_email})
    let cart = await Cart.findById(checkout.client_reference_id);
    if (!cart) return next(new AppError("Cart not found", 404));
    // total cart price
    let TotalOrderPrice = Cart.TotalCartPriceAfterDiscount || Cart.TotalCartPrice;
    // create order
    let order = new Order({
      User: User._id,
      OrderItems: Cart.CartItems,
      ShippingAddress: checkout.metadata,
      TotalOrderPrice:checkout.amount_total/100,
      PaymentType:'card',
      IsPaid:true
    });
    await order.save();
    //Increment sold & decrement stock
    let options = Cart.CartItems.map((prod) => {
      return
      ({
        updateOne: {
          "filter": { _id: prod.Product },
          "update": { $inc: { sold: prod.Quantity, stock: -prod.Quantity } },
        },
      });
    });
    await Product.bulkWrite(options);
    // clear user cart
    await Cart.findByIdAndDelete(Cart._id);
  }
  res.json({success:true , message:"Checkout completed successfully" , checkout})
}))


app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.use("/upload", express.static("Upload"));
BootStrap(app);

app.use("*", (req, res, next) =>
  next(new AppError(`route not found:${req.originalUrl}`, 404))
);
app.use(GlobalError);

app.listen(port, () => console.log(`server is running successfully ${port}`));
