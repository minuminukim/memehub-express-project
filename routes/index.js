const express = require("express");
const router = express.Router();

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { logoutUser } = require("../auth");
const { asyncHandler, isLoggedIn } = require("../utils");

const memesByComments = (a, b) => {
  if (a.comments.length < b.comments.length) {
    return 1;
  } else if (a.comments.length > b.comments.length) {
    return -1;
  }
  return 0;
};

const memesByLikes = (a, b) => {
  if (a.likes.length < b.likes.length) {
    return 1;
  } else if (a.likes.length > b.likes.length) {
    return -1;
  }
  return 0;
};
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

    const isLoggedIn = (req) => req.session.auth === undefined;
    // if user logged in, render landing-page, else render index
    res.render(isLoggedIn(req) ? "landing-page" : "index", {
      title: "Memehub",
      trendingMemes,
      bestMemes,
      i: 1,
      j: 1,
    });
  })
);

// GET home page sorted by recent
router.get("/recent", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

// GET home page sorted by most comments
router.get("/hot", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

// GET following feed
router.get("/you", (req, res, next) => {
  res.render("index", { title: "Memehub" });
});

module.exports = router;
