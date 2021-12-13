var express = require('express');

const router = express.Router();


const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);





router.get('/new', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('sign-up', {
      title: 'Sign Up',
      user,
      csrfToken: req.csrfToken(),
  });
});

const userValidators = [
  check('username')
      .exists({ checkFalsy: true })
      .withMessage('Please enter Username')
      .isLength({ max: 30 })
      .withMessage('Username must not be more than 30 characters long'),
  check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('Please enter First Name')
      .isLength({ max: 50 })
      .withMessage('First Name must not be more than 50 characters long'),
  check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please enter Last Name')
      .isLength({ max: 50 })
      .withMessage('Last Name must not be more than 50 characters long'),
  check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please enter Email Address')
      .isLength({ max: 255 })
      .withMessage('Email Address must not be more than 255 characters long')
      .isEmail()
      .withMessage('Email Address is not a valid email')
      .custom((value) => {
          return db.User.findOne({ where: { email: value } })
              .then((user) => {
                  if (user) {
                      return Promise.reject('The provided Email Address is already in use by another account');
                  }
              });
      }),
  check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please enter Password')
      .isLength({ max: 50 })
      .withMessage('Password must not be more than 50 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
  check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Please confirm Password')
      .isLength({ max: 50 })
      .withMessage('Confirm Password must not be more than 50 characters long')
      .custom((value, { req }) => {
          if (value !== req.body.password) {
              throw new Error('Confirm Password does not match Password');
          }
          return true;
      })
];

router.post('/new', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
      const {
          username,
          email,
          firstName,
          lastName,
          password,
      } = req.body;

      const user = db.User.build({
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
          res.redirect('/');
      } else {
          const errors = validatorErrors.array().map((error) => error.msg);
          res.render('sign-up', {
              title: 'Sign Up',
              user,
              errors,
              csrfToken: req.csrfToken(),
          });
      }
  }));


module.exports = router;
