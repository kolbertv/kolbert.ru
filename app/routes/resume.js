const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.get("/resume", (req, res, next) => {
    res.render('resume', {
        title: '- резюме',
        path: '/resume'
    });
});

module.exports = router