const express = require("express");

const { Comment, User } = require("../../db/models");
const {
  csrfProtection,
  asyncHandler,
  handleValidationErrors,
} = require("../../utils");

const { requireAuth } = require("../../auth");
const {
  commentValidators,
  commentNotFoundError,
} = require("../../validators/comment-validators");
const getUserId = require("../utils/get-user-id");

const router = express.Router();

// const commentNotFoundError = (commentId) => {
//   const error = new Error({
//     title: "Comment not found.",
//     message: `Comment with the id of ${commentId} could not be found.`,
//     status: 404,
//   });

//   return error;
// };

const emptyCommentError = () => {
  const error = new Error({
    title: "Empty comment.",
    message: "Comment field cannot be empty.",
    status: 400,
  });

  return error;
};

router.post(
  "/",
  requireAuth,
  commentValidators,
  asyncHandler(async (req, res) => {
    const userId = getUserId(req);
    const memeId = parseInt(req.body.memeId, 10);
    const body = req.body.body;

    if (body.length) {
      const comment = await Comment.create({
        body,
        userId,
        memeId,
      });

      res.status(200).json({ comment });
    } else {
      res.status(400).json({ message: "Comment cannot be empty." });
    }
  })
);

router.put(
  "/:id(\\d+)",
  requireAuth,
  commentValidators,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findOne({
      where: { id: commentId },
      include: User,
    });

    if (comment.userId !== req.session.auth.userId) {
      const error = new Error({
        title: "Unauthorized",
        message: "You are not authorized to edit this comment.",
        status: 401,
      });

      throw error;
    }

    const body = req.body.body;

    if (comment) {
      if (body.length) {
        await comment.update({ body });
        res.json({ comment });
      } else {
        res.status(400).json({ message: "Comment cannot be empty." });
      }
    } else {
      next(commentNotFoundError(commentId));
    }
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.status(204).json({ message: "You have deleted your comment." });
    } else {
      res.status(404).json({ message: "Comment does not exist." });
    }
  })
);

module.exports = router;
