const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/admin", adminController.indexAddWork);

router.get("/admin/add-work", isAuth, adminController.getAddWork);

router.post("/admin/add-work", isAuth, adminController.postAddWork);

router.get("/admin/portfolio/:year", isAuth, adminController.listAddWork);

router.post("/admin/edit-work", isAuth, adminController.postEditWork);

router.get("/admin/edit-work/:year/:id", isAuth, adminController.editWork);

router.post("/admin/delete-work/", isAuth, adminController.deleteWork);

module.exports = router;