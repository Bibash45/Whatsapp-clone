import React, { useEffect } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCoversations } from "../features/chatSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // get Conversations
  useEffect(() => {
    if (user.token) {
      dispatch(getCoversations(user.token));
    }
  }, [user, user.token]);
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px]">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
