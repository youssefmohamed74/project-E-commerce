import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("Error connecting to database"));
};
