const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.use((req, res, next) => {
    res.status(404).render('404', {
        title: 'страница не найдена',
        path: '/'
    })
});

module.exports = router