import jwt from "jsonwebtoken";
import logger from "../configs/logger.config.js";

export const sign = async (payload, expireIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: expireIn,
      },
      (error, token) => {
        if (error) {
          logger.error(error);
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) {
        logger.error(error);
        resolve(null);
      } else {
        resolve(payload);
      }
    });
  });
};
