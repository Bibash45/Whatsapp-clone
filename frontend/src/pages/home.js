import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Peer from "simple-peer";
import {
  getCoversations,
  updateMessagesAndConversations,
} from "../features/chatSlice";
import { ChatContainer, Welcome, WhatsappHome } from "../components/chat";
import SocketContext from "../context/SocketContext";
import Call from "../components/chat/call/Call";
import {
  getCoversationId,
  getCoversationName,
  getCoversationPicture,
} from "../utils/chat";
const callData = {
  socketId: "",
  receivingCall: false,
  callEnded: false,
  name: "",
  picture: "",
};

const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // call
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState();
  const { receivingCall, callEnded, socketId } = call;
  const [show, setShow] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();

  // typing
  const [typing, setTyping] = useState(false);

  // call useEffect
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });
    socket.on("call user", (data) => {
      setCall({
        ...call,
        socketId: data.from,
        name: data.name,
        picture: data.picture,
        receivingCall: true,
        signal: data.signal,
      });
    });
  }, []);

  //--- call user function
  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getCoversationName(user, activeConversation.users),
      picture: getCoversationPicture(user, activeConversation.users),
    });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("call user", {
        userToCall: getCoversationId(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture,
      });
    });
  };

  console.log("socket id :::::::::::::>", socketId);
  // getting camera video and audio access
  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      });
  };
  const enableMedia = () => {
    myVideo.current.srcObject = stream;
  };

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
            <ChatContainer
              onlineUsers={onlineUsers}
              typing={typing}
              callUser={callUser}
            />
          ) : (
            <WhatsappHome />
          )}
        </div>
      </div>

      {/* Call  */}
      <Call
        call={call}
        setCall={setCall}
        callAccepted={callAccepted}
        userVideo={userVideo}
        myVideo={myVideo}
        stream={stream}
        setStream={setStream}
      />
    </>
  );
};

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Home {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default HomeWithSocket;
