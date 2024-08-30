import CategoryRouter from "./Category/category.router.js";
import SubCategoryRouter from "./SubCategory/subcategory.router.js";
import BrandRouter from "./Brands/brand.router.js";
import ProductRouter from "./Products/product.router.js";
import UserRouter from "./Users/user.router.js";
import AuthRouter from "./Auth/Auth.router.js";
import ReviewRouter from "./Reviews/review.router.js";
import WishlistRouter from "./Wishlist/wishlist.router.js";
import AddressRouter from "./Address/Address.router.js";
import CouponRouter from "./Coupons/coupon.router.js";
import CartRouter from "./Carts/cart.router.js";
import OrderRouter from "./Orders/order.router.js";
export const BootStrap = (app) => {
  app.use("/api/category", CategoryRouter);
  app.use("/api/SubCategory", SubCategoryRouter);
  app.use("/api/Brand", BrandRouter);
  app.use("/api/Product", ProductRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/auth/SignUp", AuthRouter);
  app.use("/api/Review", ReviewRouter);
  app.use("/api/Wishlist", WishlistRouter);
  app.use("/api/Address", AddressRouter);
  app.use("/api/Coupon", CouponRouter);
  app.use("/api/Cart", CartRouter);
  app.use("/api/Order" , OrderRouter)
};
