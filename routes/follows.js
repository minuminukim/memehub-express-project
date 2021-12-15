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
  // csrfProtection,
  // requireAuth,
  // followValidators,
  // handleValidationErrors,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    console.log(userId);
    // const currentUser = await User.findByPk(userId, {
    //   include: [{ model: User, as: "followings" }],
    // });
    console.log(userId);
    // check if already following user
    // const followings = currentUser.followings.map(
    //   ({ dataValues: { id, username, firstName, lastName } }) => {
    //     const userData = { id, username, firstName, lastName };
    //     return userData;
    //   }
    // );

    // for (const following of followings) {
    //   if ()
    // }

    // console.log(followings);
  })
);

module.exports = router;
