import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DataBase/connection.js";
import { BootStrap } from "./src/modules/BootStrap.js";
import { GlobalError } from "./src/middleware/GlobalError.js";
import { AppError } from "./src/modules/utils/App.Error.js";
import cors from "cors";
import { CatchError } from "./src/middleware/CatchError.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.SECRET_KEY);

dotenv.config();
const app = express();

app.post('/api/webhook' , express.raw({type:"/application/json"}) ,CatchError , (req , res) =>
{
  const sig = req.headers['stripe-signature'].toString()
  let event = Stripe.webhooks.constructEvent(req.body,sig,"whsec_nznptOO76TcKGtBo30mAmkhe8bkzLowN")
  let checkout
  if(event.type == "checkout.session.completed")
  {
    checkout = event.data.object
  }
  res.json({success:true , message:"Checkout completed successfully" , checkout})
})


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
