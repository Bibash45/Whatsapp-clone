export const getCoversationId = (user, users) => {
  return users[0]._id === user._id ? users[1] : users[0]._id;
};
