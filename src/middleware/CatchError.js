import { AppError } from "../modules/utils/App.Error.js";

export const CatchError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new AppError(err, 500));
    });
  };
};
