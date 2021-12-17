const express = require("express");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");

const router = express.Router();


router.post("/", asyncHandler(async (req, res) => {
  try{
    let comment = await db.Comment.build({
      body: req.body.contentValue,
      userId: req.session.auth.userId,
      memeId: req.body.memeId,
    })
    comment.save(function (err) {
      if (err) {
        console.log(err);
        return;
      } else {
        res.json({ comment })
      }
    });

  }
  catch(e){
    console.log(e);
  }



}));



router.post("/:id(\\d+)/delete", asyncHandler(async (req, res) => {

  
  try{
    const commentId = parseInt(req.body.commentId, 10);
    const comment = await db.Comment.findByPk(commentId);
    await comment.destroy();


  }
  catch(e){
    console.log(e);
  }

}));


// router.post("/api/comments/:id(\\d+)/edit", csrfProtection, requireAuth, asyncHandler(async (req, res) => {


// }));

module.exports = router;
