const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const memesValidators = require("../validators/meme-validators");
const { requireAuth } = require("../auth");

const router = express.Router();

router.get("/new", csrfProtection, requireAuth, (req, res) => {
  res.render("new-meme", {
    title: "New Meme",
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/new",
  csrfProtection,
  requireAuth,
  memesValidators,
  asyncHandler(async (req, res) => {
    const { headline, caption, link } = req.body;

    const meme = db.Meme.build({
      userId: res.locals.user.id,
      headline,
      caption,
      link,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await meme.save();
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("new-meme", {
        title: "New Meme",
        meme,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);
    const meme = await db.Meme.findByPk(memeId, {include: [db.User, db.Comment, db.Like]})
    let comments = meme.Comments
    console.log(comments[0])
    let bodyArr = [];
    comments.forEach(comment => {
        bodyArr.push(comment.dataValues.body, comment.dataValues.userId)
    });

    // console.log(meme.Comments[0].dataValues.body);
    //     {
    //   include: [
    //     { model: db.Comment, as: "comments" },
    //     { model: db.Like, as: "likes" },
    //   ],}
    res.render("individual-meme", { title: "Meme", meme, comments });
  })
);

module.exports = router;
