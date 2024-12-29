import React, { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCoversations } from "../features/chatSlice";
import { ChatContainer, Welcome, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user._id);
  }, [user]);

  // get Conversations
  useEffect(() => {
    if (user.token) {
      dispatch(getCoversations(user.token));
    }
  }, [user, user.token]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center ">
      {/* container */}
      <div className="container min-h-screen flex py-[19px]">
        {/* sidebar */}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
