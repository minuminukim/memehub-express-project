const express = require("express");
const { validationResult } = require("express-validator");
const { User, Meme, Comment, Like, Follow } = require("../db/models");
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
            [Op.or]: {
            headline: {
                [Op.like]: `%${search}%`
            },
            caption: {
                [Op.like]: `%${search}%`
            }
        }
    }
    })

    console.log(findMeme)
    res.render('search-page', {
        title: "Search",
        findMeme,
    })
}));

module.exports = router;
