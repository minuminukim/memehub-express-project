const express = require("express");
const { check, validationResult } = require("express-validator");

const { Follow } = require("../db/models");
const usersRouter = require("./users");
const { isFollowing } = require("./utils/follows-helpers");

const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require("../utils");
const { requireAuth } = require("../auth");
const followValidators = require("../validators/follow-validators");

const router = express.Router();

// router.use("/users", usersRouter);
// router.use(requireAuth);

// get all follows
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const follows = await Follow.findAll();
    res.json({ follows });
  })
);

router.post(
  "/",
  requireAuth,
  followValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    const follow = await Follow.create({ userId, followerId });
    res.status(201).json({ follow });
  })
);

module.exports = router;
