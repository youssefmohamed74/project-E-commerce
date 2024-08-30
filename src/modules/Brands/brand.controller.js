import slugify from "slugify";
import { AppError } from "../utils/App.Error.js";
import { CatchError } from "../../middleware/CatchError.js";
import { Brand } from "../../../DataBase/model/brand.model.js";
import { DeleteOne } from "../Handlers/handlers.js";
import { ApiFeatures } from "../utils/ApiFeatures.js";

//      Added Brand
export const AddBrand = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.Name);
  req.body.Logo = req.file.FileName;
  let brand = new Brand(req.body);
  await brand.save();
  // response
  res.json({ success: true, message: "Added brand successfully", brand });
});

//  All Brand
export const AllBrand = CatchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .search()
    .sort();
  let brand = await apiFeatures.mongooseQuery;
  // response
  res.json({
    success: true,
    message: "Get All Brand Successfully",
    brand,
    page: apiFeatures.pageNumber,
  });
});
// Get One Brand
export const GetBrand = CatchError(async (req, res, next) => {
  let brand = await Brand.findById(req.params.id);
  brand || next(new AppError("brand not found", 404));
  !brand ||
    res.json({ success: true, message: "Get Brand successfully", brand });
});
// Update Brand
export const UpdateBrand = CatchError(async (req, res, next) => {
  if (req.body.slug) req.body.slug = slugify(req.body.Name);
  if (req.file) req.body.Logo = req.file.FileName;
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  brand || next(new AppError("brand not found", 404));
  !brand ||
    res.json({ success: true, message: "Update Brand successfully", brand });
});
//  Delete Brand
export const DeleteBrand = DeleteOne(Brand);
