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
const { noExtendLeft } = require("sequelize/types/lib/operators");

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
    res.json({ follow });
  })
);

router.delete(
  "/:id(\\d+)",
  requireAuth,
  followValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const followId = parseInt(req.params.id, 10);
    const follow = await Follow.findByPk(followId);

    if (follow) {
      await follow.destroy();
      res.status(204).end();
    } else {
      next(new Error("test"));
    }
  })
);

module.exports = router;
