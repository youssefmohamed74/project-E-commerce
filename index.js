import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./DataBase/connection.js";
import { BootStrap } from "./src/modules/BootStrap.js";
import { GlobalError } from "./src/middleware/GlobalError.js";
import { AppError } from "./src/modules/utils/App.Error.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
connectDB();
app.use("/upload", express.static("Upload"));
BootStrap(app);

app.use("*", (req, res, next) =>
  next(new AppError(`route not found:${req.originalUrl}`, 404))
);
app.use(GlobalError);

app.listen(port, () => console.log(`server is running successfully ${port}`));
