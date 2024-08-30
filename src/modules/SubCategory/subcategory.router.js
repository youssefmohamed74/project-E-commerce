import { Router } from "express";
import {
  AddSubCategory,
  GetSubCategory,
  AllSubCategory,
  UpdateSubCategory,
  DeleteSubCategory,
} from "./subcategory.controller.js";

const SubCategoryRouter = Router({ mergeParams: true });
// add sub categories
SubCategoryRouter.route("/").post(AddSubCategory);
// get sub categories
SubCategoryRouter.route("/:id").get(GetSubCategory);
// get all sub categories
SubCategoryRouter.route("/").get(AllSubCategory);
// update sub categories
SubCategoryRouter.route("/:id").put(UpdateSubCategory);
// delete sub categories
SubCategoryRouter.route("/:id").delete(DeleteSubCategory);

export default SubCategoryRouter;
