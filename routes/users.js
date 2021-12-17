const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { csrfProtection, asyncHandler, isntLoggedIn } = require("../utils");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const userValidators = require("../validators/user-validators");
const loginValidators = require("../validators/login-validators");
const { checkFollow } = require("./utils/follows-helpers");

const router = express.Router();

/* CREATE A NEW USER */
router.get("/new", csrfProtection, (req, res) => {
  const user = User.build();
  res.render("sign-up", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/new",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;

    const user = User.build({
      username,
      email,
      firstName,
      lastName,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("sign-up", {
        title: "Sign Up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

/*************** SIGN IN LOGIC **************************************/
router.get("/sign-in", csrfProtection, (req, res) => {
  res.render("sign-in", {
    title: "Sign In",
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/sign-in",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });

      if (user !== null) {
        const isPassword = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (isPassword) {
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }

      errors.push("Sign In failed for the provided email and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("sign-in", {
      title: "Sign In",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post("/sign-out", (req, res) => {
  logoutUser(req, res);
  req.session.destroy(() => {
    res.clearCookie("memehub.sid");
    res.redirect("/");
  });
});

/** GET PROFILE PAGE */
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Meme,
          include: [
            { model: Comment, include: [{ model: User }] },
            { model: Like },
          ],
        },
      ],
    });
    const memes = user.Memes;

    // Follow logic
    const currentUserId = isntLoggedIn
      ? null
      : parseInt(req.session.auth.userId, 10);
    const isCurrentUser = userId === currentUserId;
    const isFollowing = await checkFollow(userId, currentUserId);
    console.log(isFollowing);

    res.render("user-page", {
      title: "User",
      memes,
      user,
      isCurrentUser,
      isFollowing,
    });
  })
);

/*****************************FOLLOWS*************************/

// GET followers by userId
router.get(
  "/:id(\\d+)/followers",
  asyncHandler(async (req, res) => {
    // find user and their followers
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id, {
      include: [{ model: User, as: "followers" }],
      order: [["id", "DESC"]],
    });

    // find current user's followings
    const currentUserId = isntLoggedIn
      ? null
      : parseInt(req.session.auth.userId, 10);
    const promises = await Follow.findAll({
      where: { followerId: currentUserId },
    });
    const follows = await Promise.all(promises);
    const followIds = follows.reduce((acc, { userId }) => {
      return acc.includes(userId) ? acc : acc.concat(userId);
    }, []);

    // then check for intersection with the fetched followers
    const followers = user.followers.map(
      ({ dataValues: { id, username, firstName, lastName } }) => {
        const userData = {
          id,
          username,
          firstName,
          lastName,
          mutual: followIds.includes(id),
        };

        return userData;
      }
    );

    res.render("followers", {
      followers,
      currentUserId,
      count: followers.length,
    });
  })
);

// GET following by userId
router.get(
  "/:id(\\d+)/following",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id, {
      include: [{ model: User, as: "followings" }],
      order: [["id", "DESC"]],
    });

    // find mutual relationship here, where current user also follows
    const currentUserId = isntLoggedIn
      ? null
      : parseInt(req.session.auth.userId, 10);
    const promises = await Follow.findAll({
      where: { followerId: currentUserId },
    });
    const follows = await Promise.all(promises);
    const followIds = follows.reduce((acc, { userId }) => {
      return acc.includes(userId) ? acc : acc.concat(userId);
    }, []);

    const followings = user.followings.map(
      ({ dataValues: { id, username, firstName, lastName } }) => {
        const userData = {
          id,
          username,
          firstName,
          lastName,
          mutual: followIds.includes(id),
        };

        return userData;
      }
    );

    res.render("following", {
      followings,
      count: followings.length,
      currentUserId,
    });
  })
);

// follow a user
router.post(
  "/:id(\\d+)/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    const follow = await Follow.findOne({ where: { userId, followerId } });
    if (follow) {
      res.status(400).json({ message: "You are already following this user." });
    } else {
      const newFollow = await Follow.create({ userId, followerId });
      res.json({ newFollow });
    }
  })
);

router.delete(
  "/:id(\\d+)/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId } = req.body;
    const follow = await Follow.findOne({ where: { userId, followerId } });
    if (follow) {
      await follow.destroy();
      res
        .status(204)
        .json({ message: "You have successfully unfollowed this user." });
    } else {
      res.status(404).json({ message: "Follow does not exist" });
    }
  })
);

module.exports = router;
