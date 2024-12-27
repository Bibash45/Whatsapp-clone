import React from "react";
import moment from "moment";
import { TraingleIcon } from "../../../svg";

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* Message Container */}
      <div
        className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
          me ? "bg-green_3 " : "dark:bg-dark_bg_2"
        }`}
      >
        {/* Message Content */}
        <p className="float-left h-full text-xs pb-4 pr-8">{message.message}</p>
        {/* Message Date */}
        <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 text-dark_text_5 leading-none">
          {moment(message.createdAt).format("HH:mm")}
        </span>

        {/* Triangle */}
        {!me ? (
          <span>
            <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
