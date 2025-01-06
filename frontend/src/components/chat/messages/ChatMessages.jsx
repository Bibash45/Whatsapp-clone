import { useSelector } from "react-redux";
import Message from "./Message";
import { useEffect, useRef } from "react";
import Typing from "./Typing";
import FileMessage from "./files/FileMessage";

const ChatMessages = ({ typing }) => {
  const { messages } = useSelector((state) => state.chat);
  console.log(messages);
  
  const { activeConversation } = useSelector((state) => state.chat);
  console.log(activeConversation);
  console.log(typing);

  const { user } = useSelector((state) => state.user);
  const endRef = useRef();
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  };
  return (
    <div className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')] bg-cover bg-no-repeat">
      {/* Container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* Messages */}
        {messages &&
          messages.map((message) => {
            return (
              <>
                {/* Message files */}
                {message.files.length > 0
                  ? message.files.map((file,i) => {
                    console.log(file)
                    return (
                    
                      <FileMessage
                      fileMessage={file}
                        message={message}
                        key={i}
                        me={user._id === message.sender._id}
                      />
                    )})
                  : null}
                {/* Message Text */}

                {message.message.length > 0 ? (
                  <Message
                    message={message}
                    key={message._id}
                    me={user._id === message.sender._id}
                  />
                ) : null}
              </>
            );
          })}

        {typing === activeConversation._id ? <Typing /> : ""}

        <div className="mx-2" ref={endRef}></div>
      </div>
    </div>
  );
};

export default ChatMessages;
