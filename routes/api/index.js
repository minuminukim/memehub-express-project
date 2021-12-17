const express = require("express");

const router = express.Router();

// mount subpaths
<<<<<<< HEAD
router.use("/follows", followsRouter);
=======
>>>>>>> main

router.get("/", (req, res) => {
  res.json({ message: "Hello, world" });
});

module.exports = router;
