import React, { use } from "react";
import moment from "moment";
import { dateHandler } from "../../../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { open_create_conversation } from "../../../features/chatSlice";
import { getCoversationId, getCoversationPicture } from "../../../utils/chat";
import { capitalize } from "../../../utils/string";
import SocketContext from "../../../context/SocketContext";
import { getCoversationName } from "../../../utils/chat";

const Conversation = ({ convo, socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const values = {
    receiver_id: getCoversationId(user, convo.users),
    token: user.token,
  };
  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
  };

  return (
    <li
      onClick={() => openConversation()}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 ${
        convo._id === activeConversation._id
          ? "hover:dark:bg-dark_hover_1"
          : "hover:dark:bg-dark_bg_2"
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id && "dark:bg-dark_hover_1"
      } `}
    >
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              alt={convo.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* conversation user name and message */}
          <div className="w-flex flex flex-col">
            {/* Conversation name */}
            <h1 className="font-semibold flex items-center gap-x-2">
              {capitalize(convo.name)}
            </h1>
            {/* conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage.message.substring(0, 20)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Right*/}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

const ConversationWithContext = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithContext;
