export default function (socket) {
  // user joins or opens the application
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  // join a conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  // send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;

    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;

      socket.to(user._id).emit("receive message", message);
    });
  });
}
