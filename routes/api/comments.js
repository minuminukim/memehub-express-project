const express = require("express");
// const { validationResult, buildCheckFunction } = require("express-validator");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();


router.post("/api/comments"), csrfProtection, requireAuth, asyncHandler(async (req, res)=>{

  const usersComment = await db.Comment.findOne({
    where: {
      userId: {
        [Op]:
      }
    }
  })


  const comment = db.Comment.build({
    userId: res.locals.user.id,
    memeId,
  });


})


// if(!like){
//   build a like
// }else if (like){
//   destroy
// }



router.post("/api/comments", csrfProtection, requireAuth, asyncHandler(async(req,res)={

});

module.exports = router;
