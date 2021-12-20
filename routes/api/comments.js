const express = require("express");

const db = require("../../db/models");
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

const router = express.Router();

// const commentNotFoundError = (commentId) => {
//   const error = new Error({
//     title: "Comment not found.",
//     message: `Comment with the id of ${commentId} could not be found.`,
//     status: 404,
//   });

//   return error;
// };

router.post(
  "/",
  asyncHandler(async (req, res) => {
    let comment = await db.Comment.create({
      body: req.body.contentValue,
      userId: req.session.auth.userId,
      memeId: req.body.memeId,
    });

    comment = await db.Comment.findByPk(comment.id, {
      include: db.User,
    });

    res.json({ comment });
  })
);

router.post(
  "/delete",
  asyncHandler(async (req, res) => {
    try {
      const commentId = parseInt(req.body.commentId, 10);
      console.log("commentIds", commentId);
      const comment = await db.Comment.findByPk(commentId);
      console.log("commentz", comment);
      await comment.destroy();
      res.json({ message: "Your comment was deleted successfully!" });
    } catch (e) {
      console.log(e);
    }
  })
);

router.post("/edit", asyncHandler(async (req, res) => {

// }));
// =======
  // try{

    // const memeId = parseInt(req.body.memeId, 10);
    //const comments = await db.Comment.findAll({
    //  where: {
    //    memeId: memeId,
    //  }
    //});

    //res.json({comments });

  // }
  // catch(e){
  //   console.log(e);
  // }


}));


router.put(
  "/:id(\\d+)",
  requireAuth,
  commentValidators,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (comment.userId !== req.session.auth.userId) {
      const error = new Error({
        title: "Unauthorized",
        message: "You are not authorized to edit this comment.",
        status: 401,
      });

      throw error;
    }

    if (comment) {
      await comment.update({ body: req.body.body });
      res.json({ comment });
    } else {
      next(commentNotFoundError(commentId));
    }
  })
);

module.exports = router;
