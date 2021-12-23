const { check } = require("express-validator");
const { User, Follow } = require("../db/models");
const { asyncHandler } = require("../utils");
const { checkFollow } = require("../routes/utils/follows-helpers");

// values exist
// follow doesn't already exist
// not trying to follow yourself

const followNotFoundError = () => {
  const error = Error({
    errors: ["Follow does not exist."],
    title: "Follow not found.",
    status: 404,
  });

  return error;
};

const followValidators = [
  check("userId").custom(async (userId, { req }) => {
    const followerId = req.body.followerId;
    return isFollowing(userId, followerId).then((exists) => {
      if (exists) {
        return Promise.reject("You are already following this user.");
      }
    });
  }),
];

module.exports = { followNotFoundError, followValidators };
