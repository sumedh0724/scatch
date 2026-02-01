import mongoose from "mongoose";
import config from 'config';
import debug from "debug";

const dbgr = debug("development:mongoose");

if (process.env.NODE_ENV === "development") {
  debug.enable("development:mongoose");
}

dbgr("NODE_ENV:", process.env.NODE_ENV);


mongoose
  .connect(`${config.get('MONGODB_URI')}/snatch`)
  .then(() => {
    dbgr("Connected to database.");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default mongoose.connection;
