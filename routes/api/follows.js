const express = require("express");

const { Follow } = require("../../db/models");
const { isFollowing } = require("../utils/follows-helpers");

const { asyncHandler, csrfProtection } = require("../../utils");
const { requireAuth } = require("../../auth");
const followValidators = require("../../validators/follow-validators");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const follows = await Follow.findAll();
    res.json({ follows });
  })
);

// check if request user is already following
router.get(
  "/user/:id(\\d+)/following",
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body.userId;
    const follow = await Follow.findOne({where: {userId, followerId}});
    if (follow) {
      res.json({message: "Follow already exists."});
    } else {
      res.json({message: "Follow does not exist."})
    }
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    const follow = await Follow.findOne({ where: userId, followerId });
    console.log(follow);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    const follow = await Follow.findOne({ where: { userId, followerId } });

    if (follow) {
      await follow.destroy();
      res.status(204).end();
    } else {
      const newFollow = await Follow.create({ userId, followerId });
      res.json({ newFollow });
    }
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const followId = parseInt(req.params.id, 10);
    const followerId = req.session.auth.userId;

    const follow = await Follow.findOne({ where: { userId, followerId } });
    console.log("follow@@@@@@@", follow);
    if (follow) {
      await follow.destroy();
      res.status(204).message("Success").end();
    } else {
      next(new Error("test"));
    }
  })
);

module.exports = router;
