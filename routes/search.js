const express = require("express");
const { validationResult } = require("express-validator");
const { User, Meme, Comment, Like, Follow } = require("../db/models");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('search-page', {
        title: "Search",
    })
});

router.post('/', asyncHandler(async (req, res) =>{

    const { search } = req.body


    const findMeme = await Meme.findAll({
        where: {
            headline: `${search}`
        }
    })
    console.log(search === 'hello world')
    console.log(findMeme)
    res.render('search-page', {
        title: "Search",
        findMeme,
    })
}));

module.exports = router;
