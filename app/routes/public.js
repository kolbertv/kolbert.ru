const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const router = express.Router();

router.use('/public', express.static(path.join(rootDir, 'public')));

module.exports = router