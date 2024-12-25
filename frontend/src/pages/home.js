import React, { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCoversations } from "../features/chatSlice";
import { ChatContainer, Welcome, WhatsappHome } from "../components/chat";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  console.log("active conversation :", activeConversation);

  // get Conversations
  useEffect(() => {
    if (user.token) {
      dispatch(getCoversations(user.token));
    }
  }, [user, user.token]);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* sidebar */}
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
};

export default Home;
