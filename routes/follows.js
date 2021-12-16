const express = require("express");
const { check, validationResult } = require("express-validator");

const { Follow } = require("../db/models");
const usersRouter = require("./users");
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

// fetch("http://localhost:8080/follows", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ userId: 2, followerId: 1 }),
// });

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    console.log(req.body);
    // await Follow.create({ userId, followerId });
    // res.end();
  })
);

module.exports = router;
