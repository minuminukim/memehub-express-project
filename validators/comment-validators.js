const { check } = require("express-validator");

const commentValidators = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment does not exist."),
];

const commentNotFoundError = (commentId) => {
  const error = new Error({
    title: "Comment not found.",
    message: `Comment with the id of ${commentId} could not be found.`,
    status: 404,
  });

  return error;
};

module.exports = { commentValidators, commentNotFoundError };
