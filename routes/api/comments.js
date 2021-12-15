const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();


const addComment = document.querySelector(".add-button");

addComment.addEventListener("click", async (e)=> {
  e.preventDefault();

  const {body,userId,memeId} = req.body;

  const comment = await Comment.create({body, userId: req.user.id, memeId: req.meme.id})

  const newComment = new Comment(comment);
  const message = newComment.get("")

})




// router.post("api/comments"), csrfProtection, requireAuth, memesValidators, asyncHandler(async (req, res) => {
//   const { body, userId, memeId } = req.body;

//   const comment = db.Comment.build({
//     username,
//     email,
//     firstName,
//     lastName,
//   });
// })





module.exports = router;
