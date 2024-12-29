export default function (socket) {
  // user joins or opens the application
  socket.on("join", (userId) => {
    console.log("user has joined : ", userId);
    socket.join(userId);
  });

  // join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
    console.log("user has joined conversatuon : ", conversation);
  });

  // send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });
}
