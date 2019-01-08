const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

router.get("/admin/add-work", (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-work.html'))
});

router.post("/admin/add-work", (req, res, next) => {
    console.log(req.body)
    res.redirect("/");
});


module.exports = router