const express = require('express')

const adminController = require('../controllers/admin');

const router = express.Router()


router.get("/admin", adminController.indexAddWork);

router.get("/admin/add-work", adminController.getAddWork);

router.post("/admin/add-work", adminController.postAddWork);


router.get("/admin/portfolio/:year", adminController.listAddWork);


router.post("/admin/edit-work", adminController.postEditWork);

router.get("/admin/edit-work/:year/:id", adminController.editWork);


router.post("/admin/delete-work/", adminController.deleteWork);






module.exports = router