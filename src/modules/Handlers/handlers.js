import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";

// End Point All Project Delete One 
export const DeleteOne = (model) => {
  return CatchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    document || next(new AppError("document Not Found", 404));
    !document ||
      res.json({
        success: true,
        message: "Document Delete Successfully",
        document,
      });
  });
};
