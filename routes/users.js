const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { csrfProtection, asyncHandler, isntLoggedIn } = require("../utils");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const userValidators = require("../validators/user-validators");
const loginValidators = require("../validators/login-validators");
const aboutValidators = require("../validators/about-validators");
const { checkFollow, getFollow } = require("./utils/follows-helpers");

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
    const profileUser = await User.findByPk(userId, {
      include: [
        {
          model: Meme,
          include: [
            { model: Comment, include: [{ model: User }] },
            { model: Like },
          ],
        },
        { model: User, as: "followers" },
      ],
    });
    console.log(JSON.stringify(profileUser, null, 2));

    const memes = profileUser.Memes;

    // Follow logic
    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);

    const isCurrentUser = userId === currentUserId;
    // const isFollowing = await checkFollow(userId, currentUserId);
    const { followers } = profileUser.dataValues;
    const numberOfFollowers = followers.length;
    const [isFollowing, followId] = getFollow(followers, currentUserId);

    res.render("user-page", {
      title: "User",
      memes,
      profileUser,
      currentUserId,
      isCurrentUser,
      isFollowing,
      followId,
      numberOfFollowers,
    });
  })
);

/*****************************About Page*************************/
router.get(
  "/:id(\\d+)/about",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const profileUser = await User.findByPk(userId, {
      include: { model: User, as: "followers" },
    });

    const followNum = await Follow.findAll({
      where: {
        userId: profileUser.id,
      },
    });

    let numberOfFollowers = followNum.length;

    // Follow logic
    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);

    const { followers } = profileUser.dataValues;
    const [isFollowing, followId] = getFollow(followers, currentUserId);
    const isCurrentUser = userId === currentUserId;

    res.render("about-page", {
      title: "User",
      profileUser,
      isCurrentUser,
      isFollowing,
      followId,
      numberOfFollowers,
    });
  })
);

//get about edit page

router.get(
  "/:id(\\d+)/about/edit",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const profileUser = await User.findByPk(userId, {
      include: { model: User, as: "followers" },
    });

    // Follow logic
    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);

    const { followers } = profileUser.dataValues;
    const [isFollowing, followId] = getFollow(followers, currentUserId);
    const isCurrentUser = userId === currentUserId;
    const numberOfFollowers = followers.length;
    res.render("about-page-edit", {
      title: "User",
      profileUser,
      isCurrentUser,
      isFollowing,
      followId,
      numberOfFollowers,
      csrfToken: req.csrfToken(),
    });
  })
);

//Edit the about page

router.post(
  "/:id(\\d+/about/edit)",
  csrfProtection,
  requireAuth,
  aboutValidators,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const profileUser = await User.findByPk(userId);

    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);
    const isCurrentUser = userId === currentUserId;
    const isFollowing = await checkFollow(userId, currentUserId);

    const { biography, profilePicture } = req.body;

    const about = {
      biography,
      profilePicture,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await profileUser.update(about);
      res.redirect(`/users/${profileUser.id}/about`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("about-page-edit", {
        title: "Edit About",
        about,
        errors,
        profileUser,
        isCurrentUser,
        isFollowing,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

/*****************************FOLLOWS*************************/

// GET followers by userId
router.get(
  "/:id(\\d+)/followers",
  asyncHandler(async (req, res) => {
    // find user and their followers
    const id = parseInt(req.params.id, 10);
    const profileUser = await User.findByPk(id, {
      include: [{ model: User, as: "followers" }],
      order: [["id", "DESC"]],
    });

    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);

    let { followers } = profileUser.dataValues;
    const isCurrentUser = profileUser.id === currentUserId;
    const isFollowing = await checkFollow(profileUser.id, currentUserId);
    // then check for intersection with the fetched followers
    followers = profileUser.followers.map((follower) => {
      const { id, username, firstName, lastName, biography, profilePicture } =
        follower.dataValues;

      const isMutual = follower.id === currentUserId;
      const followId = isMutual ? 0 : follower.Follow.id;

      return {
        id,
        username,
        firstName,
        lastName,
        biography,
        profilePicture,
        isMutual,
        followId,
      };
    });

    console.log(followers);
    const numberOfFollowers = followers.length;
    res.render("followers", {
      followers,
      profileUser,
      currentUserId,
      numberOfFollowers,
      isCurrentUser,
      isFollowing,
      count: followers.length,
    });
  })
);

// GET following by userId
router.get(
  "/:id(\\d+)/following",
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const profileUser = await User.findByPk(id, {
      include: [{ model: User, as: "followings" }],
      order: [["id", "DESC"]],
    });

    const currentUserId = isntLoggedIn(req)
      ? null
      : parseInt(req.session.auth.userId, 10);

    const isCurrentUser = currentUserId === profileUser.id;
    const isFollowing = await checkFollow(profileUser.id, currentUserId);

    let { followings } = profileUser.dataValues;
    // find mutual relationship here, where current user also follows
    followings = profileUser.followings.map((following) => {
      const { id, username, firstName, lastName, biography, profilePicture } =
        following.dataValues;

      const isMutual = following.id === currentUserId;
      const followId = isMutual ? 0 : following.Follow.id;

      return {
        id,
        username,
        firstName,
        lastName,
        biography,
        profilePicture,
        isMutual,
        followId,
      };
    });

    res.render("following", {
      followings,
      profileUser,
      count: followings.length,
      currentUserId,
      isCurrentUser,
      isFollowing,
    });
  })
);

// follow a user
router.post(
  "/:id(\\d+)/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId, followId } = req.body;
    // const follow = await Follow.findOne({ where: { userId, followerId } });
    // if (follow) {
    //   res.status(400).json({ message: "You are already following this user." });
    // } else {
    //   const newFollow = await Follow.create({ userId, followerId });
    //   res.json({ newFollow });
    // }
    if (!parseInt(followId, 10)) {
      const newFollow = await Follow.create({ userId, followerId });
      res.json({ newFollow });
    } else {
      res.status(400).json({ message: "You are already following this user." });
    }
  })
);

router.delete(
  "/:id(\\d+)/following",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId, followerId, followId } = req.body;
    const follow = await Follow.findByPk(parseInt(followId, 10));
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
