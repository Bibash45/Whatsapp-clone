import app from "./app.js";
import logger from "./configs/logger.config.js";

// env variable
const PORT = process.env.PORT || 8000;

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
