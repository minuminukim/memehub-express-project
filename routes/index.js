const express = require("express");
const router = express.Router();

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { logoutUser } = require("../auth");
const { asyncHandler, isLoggedIn } = require("../utils");
const { memesByComments, memesByLikes } = require("./utils/meme-sorts");

/* GET home page -- default sorted by likes. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const memes = await Meme.findAll({
      include: [
        { model: Comment, as: "comments" },
        { model: Like, as: "likes" },
        User,
      ],
    });

    // fetch memes by most comments
    const trendingMemes = memes
      .filter((meme) => meme.comments.length)
      .sort((a, b) => memesByComments(a, b))
      .slice(0, 6);

    // // console.log("hello", JSON.stringify(trendingMemes, null, 2));

    // // fetch memes by likes
    const bestMemes = memes
      .filter((meme) => meme.likes.length)
      .sort((a, b) => memesByLikes(a, b))
      .slice(0, 10);

    // if user logged in, render landing-page, else render index
    res.render(isLoggedIn(req) ? "landing-page" : "index", {
      title: "Memehub",
      trendingMemes,
      bestMemes,
      i: 1,
    });
  })
);

// GET home page sorted by recent
router.get(
  "/recent",
  asyncHandler(async (req, res, next) => {
    const latestMemes = await Meme.findAll({ order: [["id", "DESC"]] });
    res.render("index", { title: "Memehub", latestMemes });
  })
);

router.get(
  "/best",
  asyncHandler(async (req, res, next) => {
    const memes = await Meme.findAll({
      include: [
        { model: Comment, as: "comments" },
        { model: Like, as: "likes" },
        User,
      ],
    });

    const bestMemes = memes
      .filter((meme) => meme.likes.length)
      .sort((a, b) => memesByLikes(a, b))
      .slice(0, 10);

    res.render("index", { title: "Memehub", bestMemes });
  })
);

// GET home page sorted by most comments
router.get(
  "/hot",
  asyncHandler(async (req, res, next) => {
    const memes = await Meme.findAll({
      include: [
        { model: Comment, as: "comments" },
        { model: Like, as: "likes" },
        User,
      ],
    });

    const trendingMemes = memes
      .filter((meme) => meme.comments.length)
      .sort((a, b) => memesByComments(a, b))
      .slice(0, 6);

    res.render("index", { title: "Memehub", trendingMemes });
  })
);

// GET following feed
router.get(
  "/you",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;

    // get logged in user & the users they're following
    const user = await User.findByPk(parseInt(userId), {
      include: [
        {
          model: User,
          as: "followings",
          include: Meme,
        },
      ],
    });

    // get followings memes
    const followMemes = user.followings.map((following) => following.Memes);

    // console.log(JSON.stringify(followMemes, null, 2));

    res.render("index", { title: "Memehub", followMemes });
  })
);

module.exports = router;
