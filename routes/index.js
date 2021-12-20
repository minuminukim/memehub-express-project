const express = require("express");
const router = express.Router();

const { User, Meme, Comment, Like, Follow } = require("../db/models");
const { requireAuth } = require("../auth");
const { asyncHandler } = require("../utils");
const { memesByComments, memesByLikes } = require("./utils/meme-sorts");
const getUserId = require("./utils/get-user-id");
const fetchDevelopers = require("./utils/fetch-developers");

/* GET home page -- default sorted by likes. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const currentUserId = getUserId(req);

    const memes = await Meme.findAll({
      include: [Comment, Like, User],
    });

    // fetch memes by most comments
    const trendingMemes = memes
      .filter((meme) => meme.Comments.length)
      .sort((a, b) => memesByComments(a, b))
      .slice(0, 6);

    // fetch memes by likes
    const feedMemes = memes.sort((a, b) => memesByLikes(a, b)).slice(0, 20);

    /********** RECOMMENDED FOLLOWERS (the developers) *************/
    // Helper that queries for users & their followers, then maps relevant data
    const developers = await fetchDevelopers(currentUserId);

    // If user logged in, render landing-page, else render index
    return res.render(currentUserId === null ? "landing-page" : "index", {
      title: "Memehub",
      trendingMemes,
      feedMemes,
      currentUserId,
      developers,
      i: 1,
    });
  })
);

// GET home page sorted by recent
router.get(
  "/recent",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUserId = getUserId(req);
    const developers = await fetchDevelopers(currentUserId);
    const feedMemes = await Meme.findAll({
      order: [["id", "DESC"]],
      include: User,
    });

    res.render("index", {
      title: "Memehub",
      feedMemes,
      currentUserId,
      developers,
    });
  })
);

// GET home page sorted by most likes
router.get(
  "/hot",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUserId = getUserId(req);
    const developers = await fetchDevelopers(currentUserId);
    const memes = await Meme.findAll({
      include: [Like, User],
    });
    const feedMemes = memes.sort((a, b) => memesByLikes(a, b));

    res.render("index", {
      title: "Memehub",
      feedMemes,
      currentUserId,
      developers,
    });
  })
);

// GET home page sorted by most comments
router.get(
  "/trending",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUserId = getUserId(req);

    const memes = await Meme.findAll({
      include: [Comment, User],
    });

    const feedMemes = memes.sort((a, b) => memesByComments(a, b));

    const developers = await fetchDevelopers(currentUserId);
    res.render("index", {
      title: "Memehub",
      feedMemes,
      currentUserId,
      developers,
    });
  })
);

// GET following feed
router.get(
  "/you",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUserId = getUserId(req);
    const developers = await fetchDevelopers(currentUserId);

    // Fetch user & their following memes
    const user = await User.findByPk(currentUserId, {
      include: [
        {
          model: User,
          as: "followings",
          include: {
            model: Meme,
            order: ["id", "DESC"],
            include: User,
          },
        },
      ],
    });

    // iterate through following memes & flatten array
    const followings = user.followings;
    const feedMemes = followings.reduce((acc, { Memes }) => {
      return acc.concat(Memes);
    }, []);

    res.render("index", {
      title: "Memehub",
      feedMemes,
      developers,
      currentUserId,
    });
  })
);

module.exports = router;
