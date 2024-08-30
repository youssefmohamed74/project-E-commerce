import slugify from "slugify";
import { Category } from "../../../DataBase/model/category.model.js";
import { AppError } from "../utils/App.Error.js";
import { CatchError } from "../../middleware/CatchError.js";
import { DeleteOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

// create category
export const AddCategory = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Name);
  req.body.Image = req.file.FileName;
  let category = new Category(req.body);
  await category.save();
  res.json({ success: true, message: "add category successfully", category });
});
// get all categories
export const AllCategory = CatchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Category.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort();
  let category = await apiFeatures.mongooseQuery;
  // response
  res.json({
    success: true,
    message: "get all categories successfully",
    page: apiFeatures.pageNumber,
    category,
  });
});
// get one category id
export const GetCategory = CatchError(async (req, res, next) => {
  let category = await Category.findById(req.params.id);
  category || next(new AppError("Category Not Found", 404));
  !category ||
    next({ success: true, message: "Get All successfully", category });
});
// Update category
export const UpdateCategory = CatchError(async (req, res, next) => {
  if (req.body.slug) req.body.slug = slugify(req.body.Name);
  if (req.file) req.body.Image = req.file.FileName;
  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  category || next(new AppError("Category Not Found", 404));
  !category ||
    next({ success: true, message: "Update successfully", category });
});
// Deleted category
export const DeleteCategory = DeleteOne(Category);
