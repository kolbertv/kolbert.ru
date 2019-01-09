const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.get("/portfolio", (req, res, next) => {
    res.render('portfolio', {
        title: '- перечень выполненных работ',
        path: '/portfolio'
    });
});

module.exports = router