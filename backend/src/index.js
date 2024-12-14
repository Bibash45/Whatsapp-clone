import mongoose, { model } from "mongoose";
import app from "./app.js";
import logger from "./configs/logger.config.js";

// env variable
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongodb connection error: ${err}`);
  process.exit(1);
});

// mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    logger.info("Connected to Mongodb.");
  })
  .catch((err) => logger.error("Error connecting to Mongodb: ", err));

let server;
server = app.listen(PORT, () => {
  logger.info(`server is listning on port ${PORT}`);
});

// handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandleRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
  }
});
