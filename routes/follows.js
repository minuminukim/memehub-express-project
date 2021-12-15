const express = require("express");
const { check, validationResult } = require("express-validator");

const { Follow } = require("../db/models");
const usersRouter = require("./users");
const { asyncHandler } = require("../utils");
const { requireAuth } = require("../auth");

const router = express.Router();

router.use("/users", usersRouter);
router.use(requireAuth);

// get all follows
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const follows = await Follow.findAll();
    res.json({ follows });
  })
);

// router.get(
//   // mount usersRouter
//   "/(//d+)"
// )
// const validateFollow = [
//   check("")
// ]

// create a follow
router.post("/", (req, res) => {});

module.exports = router;
