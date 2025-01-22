import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  findUser,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service.js";

export const create_open_conversation = async (req, res, next) => {
  console.log(req.body);
  try {
    const sender_id = req.user.userId;
    const { receiver_id, isGroup } = req.body;

    console.log(sender_id);
    console.log(receiver_id);

    if (!isGroup) {
      // Validate receiver ID
      if (!receiver_id) {
        logger.error("Please provide the user ID you want to start a conversation with!");
        throw createHttpError.BadRequest("Receiver ID is required.");
      }

      // Check if a conversation already exists
      const existingConversation = await doesConversationExist(sender_id, receiver_id, false);
      if (existingConversation) {
        return res.status(200).json(existingConversation);
      }

      // Fetch receiver user
      const receiverUser = await findUser(receiver_id);
      if (!receiverUser) {
        logger.error("User not found");
        throw createHttpError.NotFound("Receiver user not found.");
      }

      // Create a new conversation
      const convoData = {
        name: receiverUser.name,
        picture: receiverUser.picture,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);
      const populatedConvo = await populateConversation(newConvo._id, "users", "-password");

      return res.status(201).json(populatedConvo);
    } else {
      // Handle group chat
      const existingGroupConvo = await doesConversationExist("", "", isGroup);
      return res.status(200).json(existingGroupConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
export const createGroup = async (req, res, next) => {
  const { name, users } = req.body;
  //add current user to users
  users.push(req.user.userId);
  if (!name || !users) {
    throw createHttpError.BadRequest("Please fill all fields.");
  }
  if (users.length < 2) {
    throw createHttpError.BadRequest(
      "Atleast 2 users are required to start a group chat."
    );
  }
  let convoData = {
    name,
    users,
    isGroup: true,
    admin: req.user.userId,
    picture: process.env.DEFAULT_GROUP_PICTURE,
  };
  try {
    const newConvo = await createConversation(convoData);
    const populatedConvo = await populateConversation(
      newConvo._id,
      "users admin",
      "-password"
    );
    res.status(200).json(populatedConvo);
  } catch (error) {
    next(error);
  }
};
