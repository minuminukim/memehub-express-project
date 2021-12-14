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

// GET home page sorted by most comments
router.get("/hot", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

// GET following feed
router.get("/you", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

module.exports = router;
