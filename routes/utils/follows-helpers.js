const { Follow } = require("../../db/models");

const checkFollow = async (userId, followerId) => {
  return Follow.findOne({ where: { userId, followerId } })
    .then((follow) => follow !== null)
    .catch((err) => next(err));
};

const getFollow = (followers, currentUserId) => {
  let isFollowing = false;
  let followId = 0;

  for (const follower of followers) {
    if (follower.id === currentUserId) {
      isFollowing = true;
      followId = follower.Follow.id;
    }
    break;
  }

  return [isFollowing, followId];
};

module.exports = { checkFollow, getFollow };
