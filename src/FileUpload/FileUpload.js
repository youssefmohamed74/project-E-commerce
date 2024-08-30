import multer from "multer";
import { v4 as uuidV4 } from "uuid";
import fs from "fs";
import { AppError } from "../modules/utils/App.Error.js";

const FileUpload = (FolderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `upload/${FolderName}`;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, uuidV4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (
      typeof file.mimetype === "string" &&
      file.mimetype.startsWith("image")
    ) {
      cb(null, true);
    } else {
      cb(new AppError("Image Only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
};

export const UploadSingleFile = (fieldName, FolderName) =>
  FileUpload(FolderName).single(fieldName);

export const UploadMixOfFile = (ArrayOfField, FolderName) =>
  FileUpload(FolderName).fields(ArrayOfField);
