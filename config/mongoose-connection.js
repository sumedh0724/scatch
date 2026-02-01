import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

mongoose
  .connect(`${uri}/snatch`)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default mongoose.connection;
