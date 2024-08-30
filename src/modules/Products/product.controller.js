import slugify from "slugify";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";
import { Product } from "../../../DataBase/model/product.model.js";
import { DeleteOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

//  Add Product
export const AddProduct = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Title);
  req.body.ImageCaver = files.ImageCaver[0].filename;
  req.body.Images = files.Images.map((Img) => Img.filename);
  let product = new Product(req.body);
  await product.save();
  res.json({ success: true, message: "Product added successfully", product });
});
// All Product
export const AllProduct = CatchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Product.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort();
  let product = await apiFeatures.mongooseQuery;
  // response
  res.json({
    success: true,
    message: "Get All Products Successfully",
    product,
    page: apiFeatures.pageNumber,
  });
});
// Get One Product
export const GetOneProduct = CatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  product || next(new AppError("product not found", 404));
  product ||
    res.json({
      success: true,
      message: "Get One Product Successfully",
      product,
    });
});
// Update Product
export const UpdateProduct = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Title);
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  product || next(new AppError("product not found", 404));
  product ||
    res.json({
      success: true,
      message: "Update Product Successfully",
      product,
    });
});
// Delete Product
export const DeleteProduct = DeleteOne(Product);
