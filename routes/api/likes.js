const express = require("express");

const { Like } = require("../../db/models");
const getUserId = require("../utils/get-user-id");
const { asyncHandler } = require("../../utils");
const { requireAuth } = require("../../auth");

const router = express.Router();
router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.body.userId, 10);
    const memeId = parseInt(req.body.memeId, 10);
    const like = await Like.findOne({ where: { userId, memeId } });

    if (!like) {
      const newLike = await Like.create({ userId, memeId });
      res.status(200).json({ newLike });
    } else {
      res.status(400).json({ message: "Bad request." });
    }
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const likeId = parseInt(req.params.id, 10);
    const like = await Like.findByPk(likeId);

    if (like) {
      await like.destroy();
      res.status(204).json({ message: "You have unliked this post." });
    } else {
      res.status(404).json({ message: "Like does not exist" });
    }
  })
);

module.exports = router;
