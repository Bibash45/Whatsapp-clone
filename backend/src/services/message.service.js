import createHttpError from "http-errors";
import { MessageModel } from "../models/index.js";

export const createMessage = async (data) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage)
    throw createHttpError.BadRequest("Opps.... Some thing went wrong");

  return newMessage;
};

export const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name email picture",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isGroup",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email ",
        model: "UserModel",
      },
    });
  if (!msg) throw createHttpError.BadRequest("Opps....Something went wrong !");
  return msg;
};

export const getConvoMessages = async (convo_id) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "name email pictures status")
    .populate("conversation", "name isGroup")
    .sort({ createdAt: -1 });
  if (!messages)
    throw createHttpError.BadRequest("Opps....Something went wrong !");
  return messages;
};
