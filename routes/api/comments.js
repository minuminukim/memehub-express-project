const express = require("express");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");

const router = express.Router();


router.post("/", asyncHandler(async (req, res) => {

  let comment = await db.Comment.create({
      body: req.body.contentValue,
      userId: req.session.auth.userId,
      memeId: req.body.memeId,
  })

  comment = await db.Comment.findByPk(comment.id,{
    include: db.User
  })

    res.json({comment })


}));



router.post("/delete", asyncHandler(async (req, res) => {

  try{

    const commentId = parseInt(req.body.commentId, 10);
    console.log("commentIds", commentId)
    const comment = await db.Comment.findByPk(commentId);
    console.log("commentz",comment);
    await comment.destroy();
    res.json({message: "Your comment was deleted successfully!"})

  }
  catch(e){
    console.log(e);
  }

}));

//define validators
//find comment.bypk
// req.params.id

router.put("/edit", asyncHandler(async (req, res) => {

 

    const memeId = parseInt(req.body.memeId, 10);
    const comments = await db.Comment.findAll({
      where: {
        memeId: memeId,
      }
    });



    res.json({comments });




}));

module.exports = router;
