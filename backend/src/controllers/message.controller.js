import logger from "../configs/logger.config.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getConvoMessages,
  populateMessage,
} from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const { message, convo_id, files } = req.body;
    if (!convo_id || (!message && !files)) {
      logger.error("Please provide a conversation id and a message body");
      return res.sendStatus(400);
    }
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };
    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};
export const getMessage = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;

    // Check if convo_id is provided
    if (!convo_id) {
      logger.error("Please add a conversation id in params");
      return res.sendStatus(400); // Exit the function after sending a response
    }

    // Fetch messages
    const messages = await getConvoMessages(convo_id);

    // Check if no messages exist
    if (!messages || messages.length === 0) {
      logger.error("No messages found");
      return res.json({ message: "No messages found" });
    }

    // Return the messages
    res.status(200).json(messages);
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};
