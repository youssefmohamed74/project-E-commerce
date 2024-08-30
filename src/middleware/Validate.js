import { AppError } from "../modules/utils/App.Error.js";

export const Validate = (Schema) => {
  return async (req, res, next) => {
    let { error } = Schema.Validate(
      { Image: req.file, ...req.body, ...req.params, ...req.query },
      { abortEarly: false }
    );

    if (!error) {
      next();
    } else {
      let ErrorMessage = error.details.map((err) => err.message);
      next(new AppError(ErrorMessage, 401));
    }
  };
};
