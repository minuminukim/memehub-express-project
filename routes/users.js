const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { User, Follow } = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { loginUser, logoutUser } = require("../auth");
const userValidators = require("../validators/user-validators");
const loginValidators = require("../validators/login-validators");

const router = express.Router();

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

// router.post("/sign-out", (req, res) => {
//   logoutUser(req, res);
//   res.redirect("/users/sign-in");
// });

router.post("/sign-out", (req, res) => {
  logoutUser(req, res);
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/users/sign-in");
  });
});

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId, {
      include: [
        {
          model: db.Meme,
          include: [
            { model: db.Comment, include: [{ model: db.User }] },
            { model: db.Like },
          ],
        },
      ],
    });
    let memes = user.Memes;
    res.render("user-page", { title: "User", memes, user });
  })
);

// follows
// get user followers
router.get(
  "/:id/followers",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId, {
      include: [{ model: User, as: "followers" }],
      order: [["id", "DESC"]],
    });

    const followers = currentUser.followers.map(
      ({ dataValues: { id, username, firstName, lastName } }) => {
        const userData = { id, username, firstName, lastName };
        return userData;
      }
    );

    res.render("followers", { followers });
  })
);

router.get(
  "/:id/following",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const currentUser = await User.findByPk(userId, {
      include: [{ model: User, as: "followings" }],
      order: [["id", "DESC"]],
    });

    const followings = currentUser.followings.map(
      ({ dataValues: { id, username, firstName, lastName } }) => {
        const userData = { id, username, firstName, lastName };
        return userData;
      }
    );
    // TODO: create a view for following
    res.render("following", { followings, count: followings.length });
  })
);

module.exports = router;
