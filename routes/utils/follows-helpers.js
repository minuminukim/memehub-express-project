const { Follow } = require("../../db/models");

const checkFollow = async (userId, followerId) => {
  return Follow.findOne({ where: { userId, followerId } })
    .then((follow) => follow !== null)
    .catch((err) => next(err));
};

module.exports = { checkFollow };
