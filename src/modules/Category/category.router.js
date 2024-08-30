import { Router } from "express";
import {
  AddCategory,
  AllCategory,
  GetCategory,
  UpdateCategory,
  DeleteCategory,
} from "./category.controller.js";
import { UploadSingleFile } from "../../FileUpload/FileUpload.js";
import { Validate } from "../../middleware/Validate.js";
import { AddCategoryValidate } from "./category.validation.js";
import SubCategoryRouter from "../SubCategory/subcategory.router.js";
import { AllowedTo, protectedRoutes } from "../Auth/Auth.controller.js";

const CategoryRouter = Router();

// add category
CategoryRouter.route("/").post(
  protectedRoutes,
  AllowedTo("Admin", "User", "Manager"),
  UploadSingleFile("Image", "Category"),
  Validate(AddCategoryValidate),
  AddCategory
);
// all categories
CategoryRouter.route("/").get(AllCategory);
// get one category id
CategoryRouter.route("/:id").get(GetCategory);
// Update category
CategoryRouter.route("/:id").put(
  protectedRoutes,
  AllowedTo("Admin", "Manager"),
  UploadSingleFile("Image", "Category"),
  UpdateCategory
);
// Delete category
CategoryRouter.route("/:id").delete(
  protectedRoutes,
  AllowedTo("Admin"),
  DeleteCategory
);
//All categories And All SubCategories
CategoryRouter.route("/:Category/SubCategory", SubCategoryRouter);

export default CategoryRouter;
