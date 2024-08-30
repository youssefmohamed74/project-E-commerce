import joi from "joi";

//   Add Category Validated
export const AddCategoryValidate = joi.object({
  Name: joi.string().min(1).max(50).required(),
  Image: joi
    .object({
      FieldName: joi.string().required(),
      OriginalName: joi.string().required(),
      EnCoding: joi.string().required(),
      MimeType: joi
        .string()
        .valid("image/jpeg", "image/png", "image/gif", "image/jpg")
        .required(),
      Size: joi.number().max(5242880).required(),
      Destination: joi.string().required(),
      FileName: joi.string().required(),
      Path: joi.string().required(),
    })
    .required(),
});
