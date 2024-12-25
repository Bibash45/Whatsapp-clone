import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoversationId } from "../../../utils/chat";
import { open_create_conversation } from "../../../features/chatSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const values = {
    receiver_id: contact._id,
    token: user.token,
  };
  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };

  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] hover:dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container */}
      <div className="flex items-center gap-x-3 py-[10px]">
        {/* contact infos */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact.picture}
              alt={contact.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* conversation user name and message */}
          <div className="w-flex flex flex-col">
            {/* Conversation name */}
            <h1 className="font-semibold flex items-center gap-x-2">
              {contact.name}
            </h1>
            {/* conversation status */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Contact;
