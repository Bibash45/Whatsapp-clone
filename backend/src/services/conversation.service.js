import createHttpError from "http-errors";
import ConversationModel from "../models/conversationModel.js";
import UserModel from "../models/userModel.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  let convos = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos)
    throw createHttpError.BadRequest("Opps...Something went wrong !");

  // populate message model
  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });
  return convos[0];
};

export const createConversation = async (data) => {
  const newConvo = await ConversationModel.create(data);

  if (!newConvo)
    throw createHttpError.BadRequest("Opps...Something went wrong !");

  return newConvo;
};

export const pupulateConversation = async (
  convoData,
  fieldToPopulate,
  fieldsToRemovo
) => {
  const populatedConvo = await ConversationModel.findOne({
    _id: convoData._id,
  }).populate(fieldToPopulate, fieldsToRemovo);
  if (!populatedConvo)
    throw createHttpError.BadRequest("Opps...Something went wrong !");
  return populatedConvo;
};

export const getUserConversations = async (user_id) => {
  let conversations;
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "name email picture status",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Opps.... Some thing went wrong");
    });
  return conversations;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Opps...Something went wrong !");

  return updatedConvo;
};
