export const getCoversationId = (user, users) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};
export const getCoversationName = (user, users) => {
  return users[0]._id === user._id ? users[1].name : users[0].name;
};
export const getCoversationPicture = (user, users) => {
  return users[0]._id === user._id ? users[1].picture : users[0].picture;
};

export const checkOnlineStatus = (onlineUsers, user, users) => {
  let convoId = getCoversationId(user, users);
  let check = onlineUsers.find((u) => u.userId === convoId);
  console.log(check);

  return check ? true : false;
};
