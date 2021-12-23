const express = require("express");

const router = express.Router();
const commentRouter = require("./comments.js");
const likesRouter = require("./likes.js");

// mount subpaths
router.use("/comments", commentRouter);
router.use("/likes", likesRouter);

module.exports = router;
