import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { searchUsers as searchUserService } from "../services/user.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const userId = req.user.userId
    const keyword = req.query.search;
    if (!keyword) {
      logger.error("Please add a search query first");
      throw createHttpError.BadRequest("Opps....something went wrong");
    }
    const users = await searchUserService(keyword,userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
