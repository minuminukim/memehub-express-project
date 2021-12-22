const express = require("express");
const { validationResult } = require("express-validator");

const db = require("../db/models");
const { csrfProtection, asyncHandler, isntLoggedIn } = require("../utils");
const memesValidators = require("../validators/meme-validators");
const { requireAuth } = require("../auth");
const { getFollowData } = require("./utils/follows-helpers");
const getUserId = require("./utils/get-user-id");

const router = express.Router();

router.get(
  "/new",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.session.auth.userId);
    res.render("new-meme", {
      title: "New Meme",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

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
        meme: { ...meme },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);

    const meme = await db.Meme.findByPk(memeId, {
      include: [
        {
          model: db.User,
          include: [
            { model: db.User, as: "followers" },
            { model: db.User, as: "followings" },
          ],
        },
        { model: db.Comment, include: [{ model: db.User }] },
        { model: db.Like },
      ],
    });

    let date = meme.dataValues.updatedAt;
    let dateFormat = date.toLocaleDateString("en-US");
    let comments = meme.Comments;
    let likes = meme.Likes.length;

    // follow logic
    const currentUserId = getUserId(req);

    const {
      isCurrentUser,
      numberOfFollowers,
      isFollowing,
      followId: profileFollowId,
      followings,
    } = getFollowData(meme.User, currentUserId);

    res.render("individual-meme", {
      title: "Meme",
      meme,
      comments,
      likes,
      currentUserId,
      profileFollowId,
      isCurrentUser,
      isFollowing,
      dateFormat,
      numberOfFollowers,
      followings,
    });
  })
);

router.get(
  "/:id(\\d+)/edit",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);
    const meme = await db.Meme.findByPk(memeId, { include: [db.User] });

    if (meme.User.id !== req.session.auth.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to edit this meme.";
      err.title = "Unauthorized";
      throw err;
    }
    res.render("meme-edit", {
      title: "Edit Meme",
      meme,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/:id(\\d+/edit)",
  csrfProtection,
  requireAuth,
  memesValidators,
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);
    const memeToUpdate = await db.Meme.findByPk(memeId);

    const { headline, caption, link } = req.body;

    const meme = {
      headline,
      caption,
      link,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await memeToUpdate.update(meme);
      res.redirect(`/memes/${memeId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("meme-edit", {
        title: "Edit Meme",
        meme: { ...meme, id: memeId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/:id(\\d+)/delete",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);
    const meme = await db.Meme.findByPk(memeId, { include: [db.User] });

    if (meme.User.id !== req.session.auth.userId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this meme.";
      err.title = "Unauthorized";
      throw err;
    }

    res.render("meme-delete", {
      title: "Delete Meme",
      meme,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/:id(\\d+)/delete",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const memeId = parseInt(req.params.id, 10);
    const meme = await db.Meme.findByPk(memeId);
    await meme.destroy();
    res.redirect(`/`);
  })
);

module.exports = router;
