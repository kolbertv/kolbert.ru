const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).render('index', {
        title: '',
        path: '/'
    });
});

module.exports = router