const path = require('path')

const express = require('express')

const rootDir = require('../util/path')

const productController = require('../controllers/products');

const router = express.Router()



router.get("/admin/add-work", productController.getAddProduct);

router.post("/admin/add-work", productController.postAddProduct);


module.exports = router
// exports.products = products;