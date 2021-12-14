const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const db = require("../db/models");

//Possibly dry up the three below into Utils.js
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const router = express.Router();

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

router.get("/", csrfProtection, (req, res) => {
  res.render("sign-in", {
    title: "Sign In",
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.post(
  "/",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      //For the demo I had to ignore the hashed password auth
      //because we did not seed the database with hashed passwords
      //When we begin hashing password we will need to comment in the passwordMatch function below

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passwordMatch) {
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

module.exports = router;
