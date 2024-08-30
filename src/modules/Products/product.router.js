import { Router } from "express";
import {
  AddProduct,
  AllProduct,
  GetOneProduct,
  UpdateProduct,
  DeleteProduct,
} from "./product.controller.js";
import { UploadMixOfFile } from "../../FileUpload/FileUpload.js";

const ProductRouter = Router();

// add product
ProductRouter.route("/").post(
  UploadMixOfFile(
    [
      { Name: "ImageCover", maxCount: 1 },
      { Name: "Images", maxCount: 10 },
    ],
    "product"
  ),
  AddProduct
);
// get all products
ProductRouter.route("/").get(AllProduct);
// get one product
ProductRouter.route("/:id").get(GetOneProduct);
// delete product
ProductRouter.route("/:id").delete(DeleteProduct);
// update product
ProductRouter.route("/:id").put(
  UploadMixOfFile(
    [
      { Name: "ImageCover", maxCount: 1 },
      { Name: "Images", maxCount: 10 },
    ],
    "product"
  ),
  UpdateProduct
);

export default ProductRouter;
