const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../../utils");

const { requireAuth } = require("../../auth");

const router = express.Router();
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const likeMeme = await db.Like.findOne({
      where: {
        userId: req.session.auth.userId,
        memeId: req.body.memeId,
      },
    });
    if (!likeMeme) {
      db.Like.create({
        userId: req.session.auth.userId,
        memeId: req.body.memeId,
      });
      res.json({ message: "liked" });
    } else {
      likeMeme.destroy();
      res.json({ message: "unliked" });
    }
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    
  })
)

router.use((req, res, next) => {
  console.log("zx");
  next();
});

// if a like does not exist
// build a like
// if a like exists
// destroy a like

module.exports = router;
