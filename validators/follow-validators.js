const { check } = require("express-validator");
const { User, Follow } = require("../db/models");
const { asyncHandler } = require("../utils");

// fetch follows by userId
const getFollowings = (req) => {
  const userId = parseInt(req.params.id, 10);
  const follower = Follow.findOne();
};

const followerIdValidator = (followerId) => {
  return Follow.findOne({ where: { followerId } }).then((user) => {
    if (user) {
      return Promise.reject("You are already following this user.");
    }
  });
};

// check if already following
const followValidators = [
  check("followerId").custom((followerId) => {
    return Follow.findOne({ where: { followerId } }).then((user) => {
      if (user) {
        return Promise.reject("You are already following this user.");
      }
    });
  }),
  check("userId").custom((userId, { req }) => {
    if (value === req.body.followerId) {
      throw new Error("You cannot follow yourself.");
    }
    return true;
  }),
];

module.exports = followValidators;
