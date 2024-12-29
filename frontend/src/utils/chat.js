export const getCoversationId = (user, users) => {
  return users[0]._id === user._id ? users[1] : users[0]._id;
};
export const getCoversationName = (user, users) => {
  return users[0]._id === user.name ? users[1] : users[0].name;
};
export const getCoversationPicture = (user, users) => {
  return users[0]._id === user.picture ? users[1] : users[0].picture;
};
