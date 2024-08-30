import slugify from "slugify";
import { subcategory } from "../../../DataBase/model/subcategory.model.js";
import { AppError } from "../utils/App.Error.js";
import { CatchError } from "../../middleware/CatchError.js";
import { DeleteOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

//   create SubCategory
export const AddSubCategory = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Name);
  let SubCategory = new subcategory(req.body);
  await SubCategory.save();
  res.json({
    success: true,
    message: "Added Sub Category successfully",
    SubCategory,
  });
});

//  Get All Sub Categories
export const AllSubCategory = CatchError(async (req, res, next) => {
  let FilterObj = {};
  if (req.params.category) FilterObj.category = req.params.category;
  let apiFeatures = new ApiFeatures(subcategory.find(FilterObj), req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort();
  let SubCategory = await apiFeatures.mongooseQuery;
  //   response
  res.json({
    success: true,
    message: "get all categories successfully",
    page: apiFeatures.pageNumber,
    SubCategory,
  });
});

//    Get One Sub Category
export const GetSubCategory = CatchError(async (req, res, next) => {
  let SubCategory = await subcategory.findById(req.params.id);
  SubCategory || next(new AppError("Sub Category not found", 404));
  !SubCategory ||
    next(
      new AppError({
        success: true,
        message: "Get All Sub Categories successfully",
        SubCategory,
      })
    );
});

//   Update Sub Category
export const UpdateSubCategory = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Name);
  let SubCategory = await subcategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  SubCategory || next(new AppError("Sub Category not found", 404));
  !SubCategory ||
    next(
      new AppError({
        success: true,
        message: "Update Sub Category successfully",
        SubCategory,
      })
    );
});

//  Delete SubCategory
export const DeleteSubCategory = DeleteOne(subcategory); 
