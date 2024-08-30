import { Router } from "express";
import {
  AddBrand,
  AllBrand,
  GetBrand,
  UpdateBrand,
  DeleteBrand,
} from "./brand.controller.js";
import { UploadSingleFile } from "../../FileUpload/FileUpload.js";

const BrandRouter = Router();

// add brand
BrandRouter.route("/").post(UploadSingleFile("Logo", "Brand"), AddBrand);
//get all brand
BrandRouter.route("/").get(AllBrand);
// get one brand
BrandRouter.route("/:id").get(GetBrand);
// update brand
BrandRouter.route("/:id").put(UploadSingleFile("Logo", "Brand"), UpdateBrand);
// delete brand
BrandRouter.route("/:id").delete(DeleteBrand);

export default BrandRouter;
