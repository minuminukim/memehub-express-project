const { Follow } = require("../../db/models");

const isFollowing = async (userId, followerId) => {
  const follow = await Follow.findOne({ where: { userId, followerId } });
  return follow !== null;
};

module.exports = { isFollowing };
