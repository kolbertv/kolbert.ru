const express = require('express')

const adminController = require('../controllers/admin');

const router = express.Router()

router.get("/admin/add-work", adminController.getAddWork);

router.post("/admin/add-work", adminController.postAddWork);

module.exports = router