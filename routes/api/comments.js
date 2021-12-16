const express = require("express");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();




router.post("/api/comments"), csrfProtection, requireAuth, asyncHandler(async (req, res)=>{
  const comment = db.Comment.build({
    body: body,
    memeId: parseInt(req.params.id, 10),
    userId: res.locals.user.id,
  })

  res.json({comment})
});


router.post("/api/comments/:id(\\d+)/delete", csrfProtection, requireAuth, asyncHandler(async (req, res) =>{
    const commentId = parseInt(req.params.id, 10);
    const comment = await db.Comment.findByPk(commentId);
    await comment.destroy();
}));


router.post("/api/comments/:id(\\d+)/edit", csrfProtection, requireAuth, asyncHandler(async (req, res) =>{


}));

module.exports = router;
