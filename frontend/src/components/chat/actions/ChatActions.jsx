import React, { useRef, useState } from "react";
import Input from "./Input";
import { SendIcon } from "../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPicker";
import { Attachments } from "./attachments";

const ChatActions = () => {
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const [message, setMessage] = useState("");
  const textRef = useRef();

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    await dispatch(sendMessage(values));
    setMessage("");
  };
  return (
    <form
      onSubmit={(e) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none"
    >
      {/* Container */}
      <div className="w-full flex items-center gap-x-2">
        {/* Emoji and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPickerApp
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showPicker={showEmojis}
            setShowPicker={setShowEmojis}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
            setShowEmojis={setShowEmojis}
          />
        </ul>
        {/* Input */}
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        {/* Send Button */}
        <button className="btn" type="submit">
          {status === "loading" ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatActions;
