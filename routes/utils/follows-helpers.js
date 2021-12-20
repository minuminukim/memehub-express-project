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
      break;
    }
  }

  return [isFollowing, followId];
};

// Helper that gets relevant data for follow button
const getFollowData = (user, currentUserId) => {
  const { followers } = user;
  const isCurrentUser = user.id === currentUserId;
  const numberOfFollowers = followers.length || 0;
  const [isFollowing, followId] = getFollow(followers, currentUserId);

  return {
    isCurrentUser,
    numberOfFollowers,
    isFollowing,
    followId,
  };
};

module.exports = { checkFollow, getFollow, getFollowData };
