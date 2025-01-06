import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import { ChatContainer, Welcome, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";
const callData = {
  receivingCall: true,
  callEnded: false,
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // call
  const [call, setCall] = useState(callData);
  const { receivingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);

  // typing
  const [typing, setTyping] = useState(false);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
    // get online users
    socket.on("get-online-users", (users) => {
      console.log("online users: ", users);
      setOnlineUsers(users);
    });
  }, [user]);

  // get Conversations
  useEffect(() => {
    if (user.token) {
      dispatch(getCoversations(user.token));
    }
  }, [user, user.token]);

  useEffect(() => {
    // listning to receiving message
    socket.on("receive message", (message) => {
      dispatch(updateMessagesAndConversations(message));
    });

    // listning when a user is typing
    socket.on("typing", (conversation) => setTyping(conversation));
    socket.on("stop typing", () => setTyping(false));
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center ">
        {/* container */}
        <div className="container min-h-screen flex py-[19px]">
          {/* sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation._id ? (
            <ChatContainer onlineUsers={onlineUsers} typing={typing} />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>

      {/* Call  */}
      <Call call={call} setCall={setCall} callAccepted={callAccepted} />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
