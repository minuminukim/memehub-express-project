const express = require("express");
const followsRouter = require("../follows");

const router = express.Router();

// mount subpaths
router.use("/follows", followsRouter);

router.get("/", (req, res) => {
  res.json({ message: "Hello, world" });
});

module.exports = router;
