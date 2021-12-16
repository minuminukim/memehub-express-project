const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../../utils");

const { requireAuth } = require("../../auth");
const { like } = require("sequelize/types/lib/operators");

const router = express.Router();


router.post("/api/likes"),
  requireAuth,
  asyncHandler(async (req, res) => {
    const likeMeme = await db.Like.findOne({
//       where: {
//       userId: {
//       [Op.]: <value>
//       }
//       },
//      });
// if (db.)
//     const like = db.Like.build({
//       userId: res.locals.user.id,
//       memeId: memeId,
      // like++
    });

    // if a like does not exist
    // build a like
    // if a like exists
    // destroy a like



module.exports = router;
