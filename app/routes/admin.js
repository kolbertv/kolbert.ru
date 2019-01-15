const express = require('express')

const adminController = require('../controllers/admin');

const router = express.Router()

router.get("/admin", adminController.indexAddWork);

router.get("/admin/add-work", adminController.getAddWork);

router.post("/admin/add-work", adminController.postAddWork);

router.get("/admin/portfolio/:year", adminController.listAddWork);

router.get("/admin/portfolio/:year/:id", adminController.editAddWork);



module.exports = router