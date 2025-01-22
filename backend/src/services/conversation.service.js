import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";



export const findUser = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw createHttpError.InternalServerError("Error finding the user.");
  }
};

// Function to check if a conversation exists
export const doesConversationExist = async (sender_id, receiver_id, isGroup) => {
  if (!isGroup) {
    // Find private conversations
    let convos = await ConversationModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: sender_id } } },
        { users: { $elemMatch: { $eq: receiver_id } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (!convos || convos.length === 0) return null; // Return null if no conversation exists

    // Populate the latest message sender
    convos = await UserModel.populate(convos, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return convos[0];
  } else {
    // Find group conversations
    const convo = await ConversationModel.findById(isGroup)
      .populate("users admin", "-password")
      .populate("latestMessage");

    if (!convo) return null; // Return null if no group conversation exists

    // Populate the latest message sender
    const populatedConvo = await UserModel.populate(convo, {
      path: "latestMessage.sender",
      select: "name email picture status",
    });

    return populatedConvo;
  }
};

// Function to create a new conversation
export const createConversation = async (data) => {
  const newConvo = await ConversationModel.create(data);
  if (!newConvo) {
    throw createHttpError.InternalServerError("Failed to create a new conversation.");
  }
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldToPopulate,
  fieldsToRemove
) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
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
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    });
  return conversations;
};

export const updateLatestMessage = async (convo_id, msg) => {
  const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
    latestMessage: msg,
  });
  if (!updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  return updatedConvo;
};
