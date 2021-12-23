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
  commentValidators,
  asyncHandler(async (req, res) => {
    let comment = await db.Comment.create({
      body: req.body.contentValue,
      userId: req.session.auth.userId,
      memeId: req.body.memeId,
    });

    comment = await db.Comment.findByPk(comment.id, {
      include: db.User,
    });
    if (comment) {
      res.status(200).json({ comment });
    } else {
      res.status(400).json({ message: "Please try again." });
    }
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();
      res.status(204).json({ message: "You have deleted your comment." });
    } else {
      res.status(404).json({ message: "Comment does not exist." });
    }
    // try {
    //   const commentId = parseInt(req.body.commentId, 10);
    //   console.log("commentIds", commentId);
    //   const comment = await db.Comment.findByPk(commentId);
    //   console.log("commentz", comment);
    //   await comment.destroy();
    //   res.json({ message: "Your comment was deleted successfully!" });
    // } catch (e) {
    //   console.log(e);
    // }
  })
);

// router.post(
//   "/edit",
//   asyncHandler(async (req, res) => {
//     // }));
//     // try{

// router.post("/edit", asyncHandler(async (req, res) => {

// // }));
// // =======
//   // try{

//     // const memeId = parseInt(req.body.memeId, 10);
//     //const comments = await db.Comment.findAll({
//     //  where: {
//     //    memeId: memeId,
//     //  }
//     //});
//     //res.json({comments });
//     // }
//     // catch(e){
//     //   console.log(e);
//     // }
//   })
// );

// router.post(
//   "/edit",
//   asyncHandler(async (req, res) => {
//     // }));
//     // try{

// router.post("/edit", asyncHandler(async (req, res) => {

// // }));
// // =======
//   // try{

//     // const memeId = parseInt(req.body.memeId, 10);
//     //const comments = await db.Comment.findAll({
//     //  where: {
//     //    memeId: memeId,
//     //  }
//     //});
//     //res.json({comments });
//     // }
//     // catch(e){
//     //   console.log(e);
//     // }
//   })
// );

router.put(
  "/:id(\\d+)",
  requireAuth,
  commentValidators,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findOne({
      where: { id: commentId },
      include: db.User,
    });

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
