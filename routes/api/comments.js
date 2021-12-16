const express = require("express");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();




router.post("/api/comments"), csrfProtection, requireAuth, asyncHandler(async (req, res)=>{

  let comment = await Comment.create({
    body: req.body.body,
    userId: req.body.userId,
    memeId: req.body.memeId,
  })


  comment.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.json({comment})
    }
  });

});


router.post("/api/comments/:id(\\d+)/delete", csrfProtection, requireAuth, asyncHandler(async (req, res) =>{
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);
    await comment.destroy();
}));


router.post("/api/comments/:id(\\d+)/edit", csrfProtection, requireAuth, asyncHandler(async (req, res) =>{


}));

module.exports = router;
